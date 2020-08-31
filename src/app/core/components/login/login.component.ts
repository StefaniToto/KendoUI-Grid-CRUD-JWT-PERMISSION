import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { first } from 'rxjs/operators';
import { User } from '@app/core/models';
import { AuthenticationService } from '@app/core/services/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public fields: FormlyFieldConfig[];
  public model: any;
  currentUser: User;
  private toasterService: ToasterService;
  error: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    toasterService: ToasterService,
    private authenticationService: AuthenticationService
  ) {
    this.toasterService = toasterService;
  
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   console.log("this.authenticationService.currentUserValue", this.authenticationService.currentUserValue)
    //   this.router.navigate(['/dashboard']);
    // }
  }

  ngOnInit() {

    this.form = new FormGroup({});
    this.model = {};
    this.fields = [{
      key: 'username',
      type: 'input',
      templateOptions: {
        placeholder: 'Username',
        required: true,
        addonLeft: {
          class: 'icon-user',
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        placeholder: 'Password',
        required: true,
        addonLeft: {
          class: 'icon-lock',
        },
      }
    }];

  }

  onSubmit(data) {

    var key: string = 'token';
    this.authenticationService.login(data.form.value.username, data.form.value.password )
    .pipe(first())
    .subscribe(
        data => {
          this.router.navigate(['/dashboard'], { relativeTo: this.route })     
        },
        error => {
            this.error = error;
            this.popToast();         
        });  
  }



  popToast() {
    this.toasterService.pop('error', 'Login Error!', 'Check credentials');
  }





}

