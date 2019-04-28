import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {BackboneService} from './backbone.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UnifiedModalComponent} from '../unified-modal/unified-modal.component';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        console.log('checkLogin  isLoggedIn  ===>  ' + this.backbone.isLoggedIn);
        if ('YES' === this.backbone.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.backbone.redirectUrl = url;
        console.log('checkLogin  redirectUrl  ===>  ' + this.backbone.redirectUrl);

        // // Create a dummy session id
        // const sessionId = 123456789;
        //
        // // Set our navigation extras object
        // // that contains our global query params and fragment
        // const navigationExtras: NavigationExtras = {
        //     queryParams: {'session_id': sessionId},
        //     fragment: 'anchor'
        // };

        // Navigate to the login page with extras
        // this.router.navigate(['/login'], navigationExtras);

        const modalRef = this.modalService.open(UnifiedModalComponent);

        modalRef.componentInstance.title = '登录';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '用户名',
                type: 'text',
                src: ''
            },
            {
                index: 1,
                key: '密码',
                type: 'text',
                src: ''
            }
        ];
        modalRef.componentInstance.submitEvt.subscribe(evt => {
            console.log(evt);
            this.backbone.isLoggedIn = 'YES';
            this.router.navigate(['/index']);
        });


        return false;
    }
}
