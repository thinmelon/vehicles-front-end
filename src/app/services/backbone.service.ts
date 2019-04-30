import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {UrlService} from './url.service';
import {Utils} from './utils';

@Injectable()
export class BackboneService {
    /**
     * 构造函数
     * 依赖注入 HttpClient 服务
     */
    constructor(private http: HttpClient) {
    }

    /**
     *  登录态
     */
    get isLoggedIn(): string {
        return sessionStorage.getItem('_isLoggedIn');
    }

    set isLoggedIn(loginOrNot: string) {
        sessionStorage.removeItem('_isLoggedIn');
        sessionStorage.setItem('_isLoggedIn', loginOrNot);
    }

    /**
     *  回调地址
     */
    get redirectUrl(): string {
        return sessionStorage.getItem('_redirectUrl');
    }

    set redirectUrl(url: string) {
        sessionStorage.removeItem('_redirectUrl');
        sessionStorage.setItem('_redirectUrl', url);
    }

    /**
     *  SESSION
     */
    get session(): string {
        return sessionStorage.getItem('_session');
    }

    set session(value: string) {
        sessionStorage.removeItem('_session');
        sessionStorage.setItem('_session', value);
    }

    /**
     *  publicKey RSA加密公钥
     */
    get publicKey(): string {
        return sessionStorage.getItem('_publicKey');
    }

    set publicKey(value: string) {
        sessionStorage.removeItem('_publicKey');
        sessionStorage.setItem('_publicKey', value);
    }

    /**
     *  加密
     */
    public publicEncrypt(data: any) {
        return encodeURIComponent(Utils.PublicEncrypt(this.publicKey,
            JSON.stringify({
                session: this.session,
                timestamp: Date.now(),
                data
            })));
    }

    /**
     *  测试账号登录
     * @param account   账号
     * @param password  密码
     */
    public testLogin(account: string, password: string): Observable<any> {
        return this.http.post(
            UrlService.TestLogin(), {account, password});

    }

    /**
     *  注册测试账号
     * @param account       账号
     * @param password      密码
     */
    public testRegister(account: string, password: string): Observable<any> {
        return this.http.post(
            UrlService.TestRegister(), {account, password});
    }

    /**
     *  添加操作记录
     * @param session   SESSION
     * @param action    操作类型
     * @param remark    备注
     */
    public recordAction(session: string, action: number, remark: string): Observable<any> {
        return this.http.post(
            UrlService.RecordAction(session), {action, remark});
    }

    /**
     *  查询操作记录
     * @param session   SESSION
     * @param offset    偏移量
     * @param amount    数量
     */
    public queryRecord(session: string, offset: number, amount: number): Observable<any> {
        return this.http.get(UrlService.QueryRecord(session, offset, amount));
    }

    /**
     * 查询车辆实时状态
     * @param session   SESSION
     */
    public getVehicleStatus(session: string): Observable<any> {
        return this.http.get(UrlService.GetVehicleStatus(session));
    }
}

/**
 *      操作日志
 */
export class Action {
    constructor(public index: number,
                public id: string,
                public action: string,
                public remark: string,
                public createTime: string) {
    }
}

/**
 *      账户
 */
export class Account {
    constructor(public name: string,
                public password: string,
                public confirm: string) {
    }
}

/**
 *      操作类型
 */
export const ActionType = [
    '左转',
    '右转',
    '前进',
    '后退',
    '加速',
    '减速',
    '其它'
];
