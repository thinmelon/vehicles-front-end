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

        const that = this;
        const modalRef = this.modalService.open(UnifiedModalComponent);
        // Store the attempted URL for redirecting
        this.backbone.redirectUrl = url;
        console.log('checkLogin  redirectUrl  ===>  ' + this.backbone.redirectUrl);

        modalRef.componentInstance.title = '登录框';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.submitBtnText = '登录';
        modalRef.componentInstance.cancelBtnText = '注册';
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
                type: 'password',
                src: ''
            }
        ];
        modalRef.componentInstance.submitEvt.subscribe(evt => {
            const startTime = Date.now();
            console.log('请求时间：', startTime);
            this.backbone.testLogin(
                evt[0].src,
                evt[1].src
            )
                .subscribe(result => {
                    console.log(result);
                    if (result.hasOwnProperty('code') && result.code === 0) {
                        modalRef.componentInstance.activeModal.close();
                        console.log('系统时间：', result.serverTime);
                        const endTime = Date.now();
                        console.log('当前时间：', endTime);
                        console.log('时间校准：', Math.round(result.serverTime - ((startTime + endTime) / 2)));
                        that.loginSuccess(result);
                    } else if (result.hasOwnProperty('code')) {
                        modalRef.componentInstance.hint = '账号或密码输入有误';
                    } else {
                        modalRef.componentInstance.hint = result;
                    }
                });
        });
        modalRef.componentInstance.cancelEvt.subscribe(evt => {
            this.router.navigate(['/register']);
        });

        return false;
    }

    /**
     * 登录成功
     * @param params 传参
     */
    loginSuccess(params) {
        /**
         *  保存session
         */
        this.backbone.session = params.session;
        /**
         *  保存publicKey
         */
        this.backbone.publicKey = params.publicKey;
        /**
         *  设置状态为已登录
         */
        this.backbone.isLoggedIn = 'YES';
        /**
         *  跳转至回调地址
         */
        console.log('REDIRECT URL ===> ' + this.backbone.redirectUrl);
        this.backbone.redirectUrl ? this.router.navigate([this.backbone.redirectUrl]) : this.router.navigate(['/index']);
    }
}
