"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateSignature = (params, secretKey) => {
    const sortParams = Object.fromEntries(Object.entries(params).sort());
    const paramsToString = `${Object.values(sortParams).join('{up}')}{up}${secretKey}`;
    return crypto_1.default
        .createHash('sha256')
        .update(paramsToString, 'utf-8')
        .digest('hex');
};
exports.generateSignature = generateSignature;
//# sourceMappingURL=utils.js.map