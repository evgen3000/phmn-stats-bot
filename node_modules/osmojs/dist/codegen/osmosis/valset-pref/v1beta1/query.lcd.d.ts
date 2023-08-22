import { LCDClient } from "@cosmology/lcd";
import { UserValidatorPreferencesRequest, UserValidatorPreferencesResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    userValidatorPreferences(params: UserValidatorPreferencesRequest): Promise<UserValidatorPreferencesResponseSDKType>;
}
