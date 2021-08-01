export interface IPaySecure {
    message: IPaySecureMessage;
    verifyEnrollmentRequestId: string;
    veRes: IPaySecureVERes;
    resultDetail: IPaySecureResultDetail;
}
export interface IPaySecureMessage {
    id: string;
}
export interface IPaySecureVERes {
    version: string;
    status: 'Y' | 'N' | 'E';
    paReq: string;
    acsUrl: string;
    termUrl: string;
    md: string;
    xid: string;
    actualbrand: string;
}
export interface IPaySecureResultDetail {
    errorCode: number;
}
