"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("qs");
const request_1 = __importDefault(require("./request"));
const utils_1 = require("./utils");
class Unitpay {
    constructor({ domain = 'unitpay.money', secretKey }) {
        this.supportedUnitpayIp = [
            '31.186.100.49',
            '178.132.203.105',
            '52.29.152.23',
            '52.19.56.234'
        ];
        this.config = { domain, secretKey };
        this.request = new request_1.default(domain, secretKey);
    }
    send(method, body = {}) {
        return this.request.send(method, body);
    }
    verifyIP(ip) {
        return this.supportedUnitpayIp.includes(ip);
    }
    initPayment(body) {
        if (!body.signature) {
            const signature = utils_1.generateSignature(body, this.config.secretKey);
            body.signature = signature;
        }
        return this.send('initPayment', body);
    }
    form(publicKey, params) {
        if (!publicKey)
            throw new Error('publicKey mismatch');
        if (!params.signature) {
            const signature = utils_1.generateSignature(params, this.config.secretKey);
            params.signature = signature;
        }
        return `https://${this.config.domain}/pay/${publicKey}?${qs_1.stringify(params)}`;
    }
    confirmPayment(body) {
        return this.send('confirmPayment', body);
    }
    cancelPayment(body) {
        return this.send('cancelPayment', body);
    }
    getPayment(body) {
        return this.send('getPayment', body);
    }
    refundPayment(body) {
        return this.send('refundPayment', body);
    }
    listSubscriptions(body) {
        return this.send('listSubscriptions', body);
    }
    getSubscription(body) {
        return this.send('getSubscription', body);
    }
    closeSubscription(body) {
        return this.send('closeSubscription', body);
    }
    offsetAdvance(body) {
        return this.send('offsetAdvance', body);
    }
    getPartner(body) {
        return this.send('getPartner', body);
    }
    getCommissions(body) {
        return this.send('getCommissions', body);
    }
    getCurrencyCourses(body) {
        return this.send('getCurrencyCourses', body);
    }
    getBinInfo(body) {
        return this.send('getBinInfo', body);
    }
    massPayment(body) {
        return this.send('massPayment', body);
    }
    massPaymentStatus(body) {
        return this.send('massPaymentStatus', body);
    }
}
exports.default = Unitpay;
//# sourceMappingURL=index.js.map