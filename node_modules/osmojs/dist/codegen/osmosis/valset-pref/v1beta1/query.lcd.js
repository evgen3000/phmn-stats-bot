"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.userValidatorPreferences = this.userValidatorPreferences.bind(this);
    }
    /* Returns the list of ValidatorPreferences for the user. */
    async userValidatorPreferences(params) {
        const endpoint = `osmosis/valset-pref/v1beta1/${params.address}`;
        return await this.req.get(endpoint);
    }
}
exports.LCDQueryClient = LCDQueryClient;
//# sourceMappingURL=query.lcd.js.map