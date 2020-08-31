import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models';
import { PermissionManagerService } from '../services/permissions/global.service';

const users: User[] = [
    { id: 1, username: 'superuser', password: 'superuser', firstName: 'superuser', lastName: 'superuser', RoleId: 'superuser' },
    { id: 2, username: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin', RoleId: 'admin' },
    { id: 3, username: 'user', password: 'user', firstName: 'user', lastName: 'user', RoleId: 'user' },

];

@Injectable({ providedIn: 'root' })
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(
        @Inject(PermissionManagerService) private service
    ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            //console.log('url.handleRoute', request)
            switch (true) {
                case url.endsWith('/dashboard/') && method === 'POST':
                    return authenticate();
                case url.endsWith('/dashboard/exam1/') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above                  
                    return next.handle(request);
            }
        }

        // route functions
        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                RoleId: user.RoleId,
                token: 'fake-jwt-token'
            })
        }


        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};