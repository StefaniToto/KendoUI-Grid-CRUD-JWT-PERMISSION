export enum Role {
    SUPERUSER = 'superuser',
    ADMIN = 'admin',
    Unknown = 'user',
}

export enum PermissionType {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export abstract class PermissionBase {
    public permissions: PermissionType[];
    constructor() { }
}

export class SuperuserPermission extends PermissionBase {
    constructor() {
        super();
        this.permissions = [
            PermissionType.CREATE, 
            PermissionType.READ,
            PermissionType.UPDATE, 
            PermissionType.DELETE,
        ];
    }
}

export class AdminPermission extends PermissionBase {
    constructor() {
        super();
        this.permissions = [           
            PermissionType.CREATE, 
            PermissionType.READ,
            PermissionType.UPDATE
         
        ];
    }
}

export class UnknownPermission extends PermissionBase {
    constructor() {
        super();
        this.permissions = [           
            PermissionType.READ
         
        ];
    }
}