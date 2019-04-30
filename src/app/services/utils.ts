import * as JSEncrypt from 'jsencrypt';

export class Utils {
    /**
     * 产生随机字符串
     */
    static GetNonceStr(length: number) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const count = chars.length;
        let nonceStr = '';
        for (let i = 0; i < length; i++) {
            nonceStr += chars.substr(Math.floor(Math.random() * (count - 1) + 1), 1);
        }
        return nonceStr;
    }

    /**
     * 使用公钥对数据进行加密
     */
    static PublicEncrypt(publicKey: string, data: string) {
        const instance = new JSEncrypt.JSEncrypt();
        instance.setKey(publicKey);
        return instance.encrypt(data);
    }
}
