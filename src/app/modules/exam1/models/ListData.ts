export class ListData {

    id ?: number;
    Name: string;
    Surname: string;
    Email: string;
    RoleId ?: boolean;



  
    constructor(obj?: any) {
        if (obj) {

            this.id = obj.id;
            this.Name = obj.Name;
            this.Surname = obj.Surname;
            this.Email = obj.Email;
            this.RoleId = obj.RoleId;
     

        }
    }
}
