import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public userisLogged: boolean = false;

  constructor(private service: AuthenticationService) {
   
  }
  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role) {
      this.userisLogged = true;
    } else
      this.userisLogged = false;
  }

  logout() {
    this.service.logout()
  }





}
