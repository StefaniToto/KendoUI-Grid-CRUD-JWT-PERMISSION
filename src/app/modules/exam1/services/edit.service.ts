import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { ListData } from '../models/ListData';
import { Result } from '../models/Results';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {

    private url;
    constructor(private http: HttpClient) {
        super([]);
        this.url = 'https://my-json-server.typicode.com/stefani0/GreeceTest/customers/';
    }

    private data: any[] = [];

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();
        console.log("data deleted", )

        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => 
            {this.read(), () => this.read(),
             console.log("data deleted", this.read())}
            );
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(action: string = '', data?: any): Observable<any[]> {
        return this.http
            .jsonp(`${this.url}${action}?${this.serializeModels(data)}`, 'callback')
            .pipe(map(res => <any[]>res));
    }

    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }



    getData(): Observable<Result<ListData>> {
        return this.http.get<Result<ListData>>(
            `${this.url}`
        )
    }
}
