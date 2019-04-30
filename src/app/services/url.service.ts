// const PROTOCOL = 'https://';
const PROTOCOL = 'http://';
// const HOST = 'www.pusudo.cn';
const HOST = '106.14.154.220:3000';
const LOGIN = PROTOCOL + HOST + '/platform';
const VEHICLES = PROTOCOL + HOST + '/vehicles';

export class UrlService {
    /**
     * =====================      登录 / 注册       ===================== *
     */
    static TestLogin(): string {
        return `${ LOGIN }/dev/login`;
    }

    static TestRegister(): string {
        return `${ LOGIN }/dev/register`;
    }

    /**
     * =====================      行驶记录        ===================== *
     */
    static RecordAction(session: string): string {
        return `${ VEHICLES }/record?session=${ session }`;
    }

    static QueryRecord(session: string, offset: number, amount: number): string {
        return `${ VEHICLES }/record?session=${ session }&offset=${ offset }&amount=${ amount }`;
    }

    static GetVehicleStatus(session: string): string {
        return `${ VEHICLES }/status?session=${ session }`;
    }
}
