import { Injectable } from '@angular/core';

import { PermissionsFactory } from '@app/core/services/permissions/FPermissions';
import { PermissionBase, PermissionType, Role } from '@app/core/models/ERoles';



@Injectable(
    {providedIn: 'root'}
)
export class PermissionManagerService {  
  private permissions: PermissionBase;
  constructor() { }


  isGranted(permission: PermissionType) {
    const permissions = PermissionsFactory.getInstance().permissions;
    // console.log("permissions isGranted" ,permissions)
    for (let perm of permissions) {
      if (perm === permission){
        return true;
      }
    }
    return false;
  }  authAs(role: Role) {   
    localStorage.setItem('role',
      (role === null)
        ? Role.Unknown
        : role
    );
    this.permissions = PermissionsFactory.getInstance();
  }
}