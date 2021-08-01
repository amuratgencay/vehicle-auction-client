
// import { JsonObject, JsonProperty } from "json2typescript";
// import { DateConverter } from '../utils/data-converters/date-converter';

// @JsonObject("Token")
export class TokenModel {
    public isValid(): boolean {
        return !!this.accessToken && this.experies > new Date();
    }
    public isSuccess(): boolean {
        return !!this.accessToken;
    }
    public ruhsatSahibiMi(ruhsatSahibiId): boolean {
        return this.ruhsatSahibiId && this.ruhsatSahibiId.indexOf(ruhsatSahibiId) >= 0;
    }
    public accessToken: string = undefined;
    public experies: Date = undefined;
    public fullName: string = undefined;
    public email: string = undefined;
    public userId: string = undefined;
    public ruhsatSahibiId: [number] = undefined;
    public roles: [string] = undefined;
    public permissions: [string] = undefined;
    constructor() {
    }
    deserialize(input): TokenModel {
        Object.keys(input).forEach(key => {
            if (key === 'experies') {
                this[key] = new Date(input[key]);
            } else {
                this[key] = input[key];
            }
        });
        return this;
    }
}