export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.params = this.params.bind(this);
    }
    /* Params queries all parameters of the ICA host submodule. */
    async params(_params = {}) {
        const endpoint = `ibc/apps/interchain_accounts/host/v1/params`;
        return await this.req.get(endpoint);
    }
}
//# sourceMappingURL=query.lcd.js.map