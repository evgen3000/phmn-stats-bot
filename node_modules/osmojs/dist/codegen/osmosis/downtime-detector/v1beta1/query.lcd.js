"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.recoveredSinceDowntimeOfLength = this.recoveredSinceDowntimeOfLength.bind(this);
    }
    /* RecoveredSinceDowntimeOfLength */
    async recoveredSinceDowntimeOfLength(params) {
        const options = {
            params: {}
        };
        if (typeof params?.downtime !== "undefined") {
            options.params.downtime = params.downtime;
        }
        if (typeof params?.recovery !== "undefined") {
            options.params.recovery = params.recovery;
        }
        const endpoint = `osmosis/downtime-detector/v1beta1/RecoveredSinceDowntimeOfLength`;
        return await this.req.get(endpoint, options);
    }
}
exports.LCDQueryClient = LCDQueryClient;
//# sourceMappingURL=query.lcd.js.map