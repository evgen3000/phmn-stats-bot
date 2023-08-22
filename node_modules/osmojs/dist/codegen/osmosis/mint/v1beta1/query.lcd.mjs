export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.params = this.params.bind(this);
        this.epochProvisions = this.epochProvisions.bind(this);
    }
    /* Params returns the total set of minting parameters. */
    async params(_params = {}) {
        const endpoint = `osmosis/mint/v1beta1/params`;
        return await this.req.get(endpoint);
    }
    /* EpochProvisions returns the current minting epoch provisions value. */
    async epochProvisions(_params = {}) {
        const endpoint = `osmosis/mint/v1beta1/epoch_provisions`;
        return await this.req.get(endpoint);
    }
}
//# sourceMappingURL=query.lcd.js.map