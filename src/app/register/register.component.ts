import {Component, OnInit} from '@angular/core';
import {Account, BackboneService} from '../services/backbone.service';
import {LoginGuard} from '../services/authentication.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
    errorMessage = '';
    account = new Account('', '', '');

    constructor(private guard: LoginGuard,
                private backbone: BackboneService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.account.password !== this.account.confirm) {
            this.errorMessage = '再次输入的密码不一致';
        } else {
            this.errorMessage = '';
            this.backbone
                .testRegister(this.account.name, this.account.password)
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.guard.loginSuccess({
                            session: res.session,
                            publicKey: res.publicKey
                        });
                    } else {
                        this.errorMessage = '注册失败';
                    }
                });
        }
    }
}
