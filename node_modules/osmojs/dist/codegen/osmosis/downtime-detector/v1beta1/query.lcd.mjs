export class LCDQueryClient {
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
//# sourceMappingURL=query.lcd.js.map