import UnitpayRequest, { IResponse } from './request';
export interface IConfig {
    domain?: string;
    secretKey: string;
}
declare type TPaymentStatus = 'success' | 'wait' | 'error' | 'error_pay' | 'error_check' | 'refund' | 'secure';
declare type TPaymentCode = 'mc' | 'card' | 'webmoney' | 'webmoneyWmr' | 'yandex' | 'qiwi' | 'paypal' | 'applepay' | 'samsungpay' | 'googlepay';
declare type IOperatorCode = 'mts' | 'mf' | 'beeline' | 'tele2';
export interface ICommonResponse {
    message: string;
}
export interface IGetPaymentRequest {
    paymentId: number;
}
export interface IGetPaymentResponse {
    date: string;
    purse: string;
    profit: number;
    status: TPaymentStatus;
    account: string;
    payerSum: number;
    orderSum: number;
    paymentId: number;
    projectId: number;
    receiptUrl: string;
    paymentType: TPaymentCode;
    errorMessage: string;
    orderCurrency: string;
    payerCurrency: string;
}
export interface IInitPaymentRequest {
    sum: number;
    desc: string;
    account: string;
    projectId: number;
    paymentType: TPaymentCode;
    ip?: string;
    local?: string;
    phone?: number;
    backUrl?: string;
    currency?: string;
    preauth?: boolean;
    operator?: IOperatorCode;
    resultUrl?: string;
    signature?: string;
    subscription?: boolean;
    subscriptionId?: number;
    preauthExpireLogic?: number;
}
export interface IInitPaymentResponse {
    type: string;
    message: string;
    paymentId: number;
    receiptUrl: string;
    response?: string;
    invoiceId?: string;
    redirectUrl?: string;
}
export declare type TRefundPaymentMethod = 'full_prepayment' | 'prepayment' | 'advance' | 'full_payment';
export interface IRefundPaymentRequest {
    paymentId: number;
    sum?: number;
    paymentMethod?: TRefundPaymentMethod;
}
export interface IListSubscriptionsRequest {
    projectId: number;
}
export interface IListSubscriptionsResponse {
    status: 'new' | 'active' | 'close';
    totalSum: number;
    startDate: string;
    description: string;
    failPayments: number;
    lastPaymentId: number;
    lastUpdateDate: string;
    subscriptionId: number;
    successPayments: number;
    parentPaymentId: number;
    closeType?: 'api' | 'error' | 'abuse';
}
export interface IGetSubscriptionRequest {
    subscriptionId: number;
}
export interface IOffsetAdvanceRequest {
    login: string;
    paymentId: string;
    cashItems?: string;
}
export interface ICommonPartnerRequest {
    login: string;
}
export interface IGetCommissionsRequest extends ICommonPartnerRequest {
    projectId: number;
}
export declare type IGetCommissionsResponse = {
    [key in TPaymentCode]: number;
};
export interface IGetCurrencyCoursesResponse {
    in: {
        [key: string]: number;
    };
    out: {
        [key: string]: number;
    };
}
export interface IGetBinInfoRequest extends ICommonPartnerRequest {
    bin: string;
}
export interface IGetBinInfoResponse {
    bin: string;
    bank: string;
    type: string;
    brand: string;
    bankUrl: string;
    category: string;
    bankPhone: string;
    countryCode: string;
}
export interface IMassPaymentRequest {
    sum: number;
    login: string;
    purse: string;
    paymentType: TPaymentCode;
    transactionId: string;
    comment?: string;
    projectId?: number;
}
export interface IMassPaymentResponse {
    sum: number;
    status: 'success' | 'not_completed';
    message: string;
    payoutId: number;
    createDate: string;
    completeDate: string;
    partnerBalance: number;
    payoutCommission: number;
    partnerCommission: number;
}
export interface IMassPaymentStatusRequest extends ICommonPartnerRequest {
    transactionId: string;
}
export interface IFormParams {
    sum: number;
    desc: string;
    account: string;
    locale?: string;
    backUrl?: string;
    currency?: string;
    signature?: string;
}
export default class Unitpay {
    readonly supportedUnitpayIp: string[];
    request: UnitpayRequest;
    private config;
    constructor({ domain, secretKey }: IConfig);
    send(method: string, body?: any): Promise<any>;
    verifyIP(ip: string): boolean;
    initPayment(body: IInitPaymentRequest): Promise<IResponse<IInitPaymentResponse>>;
    form(publicKey: string, params: IFormParams): string;
    confirmPayment(body: IGetPaymentRequest): Promise<IResponse<ICommonResponse>>;
    cancelPayment(body: IGetPaymentRequest): Promise<IResponse<ICommonResponse>>;
    getPayment(body: IGetPaymentRequest): Promise<IResponse<IGetPaymentResponse>>;
    refundPayment(body: IRefundPaymentRequest): Promise<IResponse<ICommonResponse>>;
    listSubscriptions(body: IListSubscriptionsRequest): Promise<IResponse<IListSubscriptionsResponse>>;
    getSubscription(body: IGetSubscriptionRequest): Promise<IResponse<IListSubscriptionsResponse>>;
    closeSubscription(body: IGetSubscriptionRequest): Promise<IResponse<ICommonResponse>>;
    offsetAdvance(body: IOffsetAdvanceRequest): Promise<IResponse<ICommonResponse>>;
    getPartner(body: ICommonPartnerRequest): Promise<IResponse<ICommonResponse>>;
    getCommissions(body: IGetCommissionsRequest): Promise<IResponse<IGetCommissionsResponse>>;
    getCurrencyCourses(body: ICommonPartnerRequest): Promise<IResponse<IGetCurrencyCoursesResponse>>;
    getBinInfo(body: IGetBinInfoRequest): Promise<IResponse<IGetBinInfoResponse>>;
    massPayment(body: IMassPaymentRequest): Promise<IResponse<IMassPaymentResponse>>;
    massPaymentStatus(body: IMassPaymentStatusRequest): Promise<IResponse<IMassPaymentResponse>>;
}
export {};
