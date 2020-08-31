import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { PermissionManagerService } from './global.service';
import { PermissionType } from '@app/core/models/ERoles';

@Directive({
    selector: '[appIsGranted]'
})
export class IsGrantedDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permissionManagerS: PermissionManagerService
    ) { } 
    @Input() set appIsGranted(permission: PermissionType) {
        
        this.isGranted(permission);
    } private isGranted(permission: PermissionType) {
        if (this.permissionManagerS.isGranted(permission)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}