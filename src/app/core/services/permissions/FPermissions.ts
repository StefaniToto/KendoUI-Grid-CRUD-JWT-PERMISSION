

import { PermissionBase, Role, SuperuserPermission, UnknownPermission, AdminPermission } from '../../models/ERoles';

export class PermissionsFactory {
  public static instance: PermissionBase;

  private constructor() { } public static getInstance() {
    //console.log("instance", this.instance)
   
    if (this.instance) {
      return this.instance;
    } else {
      const role = localStorage.getItem('role');
      console.log("role localStorage", role)
      switch (role) {
        case Role.SUPERUSER:
          this.instance = new SuperuserPermission();
          break;
        case Role.ADMIN:
          this.instance = new AdminPermission();
          break; 
          case Role.Unknown:
          this.instance = new UnknownPermission();
          break;
        default:
          this.instance = new UnknownPermission();
          break;
      }
    }
  }
}