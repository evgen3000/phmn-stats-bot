export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.epochInfos = this.epochInfos.bind(this);
        this.currentEpoch = this.currentEpoch.bind(this);
    }
    /* EpochInfos provide running epochInfos */
    async epochInfos(_params = {}) {
        const endpoint = `osmosis/epochs/v1beta1/epochs`;
        return await this.req.get(endpoint);
    }
    /* CurrentEpoch provide current epoch of specified identifier */
    async currentEpoch(params) {
        const options = {
            params: {}
        };
        if (typeof params?.identifier !== "undefined") {
            options.params.identifier = params.identifier;
        }
        const endpoint = `osmosis/epochs/v1beta1/current_epoch`;
        return await this.req.get(endpoint, options);
    }
}
//# sourceMappingURL=query.lcd.js.map