"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const qs_1 = require("qs");
class UnitpayRequest {
    constructor(domain, secretKey) {
        this.secretKey = secretKey;
        this.apiUrl = `https://${domain}/api`;
        this.request = got_1.default.extend({
            prefixUrl: this.apiUrl,
            resolveBodyOnly: true,
            responseType: 'json'
        });
    }
    async send(method, params) {
        if (!this.secretKey)
            throw new Error('secretKey mismatch');
        params.secretKey = this.secretKey;
        const response = await this.request.get(`?${qs_1.stringify({ method, params })}`);
        return response;
    }
}
exports.default = UnitpayRequest;
//# sourceMappingURL=request.js.map