export interface IResponse<T> {
    result?: T;
    error?: {
        message: string;
        code?: number;
    };
}
export default class UnitpayRequest {
    private request;
    private apiUrl;
    private secretKey;
    constructor(domain: string, secretKey: string);
    send(method: string, params: any): Promise<IResponse<any>>;
}
