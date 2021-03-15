import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  @Input('appHasPermission') permissions: string[];
  constructor(private authService : AuthService,
    private templateRef : TemplateRef<any>,
    private viewContainer : ViewContainerRef ){ }

    ngOnInit() {
      this.authService.currentUser.subscribe(user => {
        console.log('Droits de l\'utilisateur : ', user.permissions);
        console.log('Permission requise : ', this.permissions);

        if (this.authService.hasPermissions(this.permissions)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      })

    }
}
