import { BinaryReader } from "../../../binary";
import { MsgStoreCode, MsgStoreCodeResponse, MsgInstantiateContract, MsgInstantiateContractResponse, MsgInstantiateContract2, MsgInstantiateContract2Response, MsgExecuteContract, MsgExecuteContractResponse, MsgMigrateContract, MsgMigrateContractResponse, MsgUpdateAdmin, MsgUpdateAdminResponse, MsgClearAdmin, MsgClearAdminResponse, MsgUpdateInstantiateConfig, MsgUpdateInstantiateConfigResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.storeCode = this.storeCode.bind(this);
        this.instantiateContract = this.instantiateContract.bind(this);
        this.instantiateContract2 = this.instantiateContract2.bind(this);
        this.executeContract = this.executeContract.bind(this);
        this.migrateContract = this.migrateContract.bind(this);
        this.updateAdmin = this.updateAdmin.bind(this);
        this.clearAdmin = this.clearAdmin.bind(this);
        this.updateInstantiateConfig = this.updateInstantiateConfig.bind(this);
    }
    storeCode(request) {
        const data = MsgStoreCode.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "StoreCode", data);
        return promise.then(data => MsgStoreCodeResponse.decode(new BinaryReader(data)));
    }
    instantiateContract(request) {
        const data = MsgInstantiateContract.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "InstantiateContract", data);
        return promise.then(data => MsgInstantiateContractResponse.decode(new BinaryReader(data)));
    }
    instantiateContract2(request) {
        const data = MsgInstantiateContract2.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "InstantiateContract2", data);
        return promise.then(data => MsgInstantiateContract2Response.decode(new BinaryReader(data)));
    }
    executeContract(request) {
        const data = MsgExecuteContract.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "ExecuteContract", data);
        return promise.then(data => MsgExecuteContractResponse.decode(new BinaryReader(data)));
    }
    migrateContract(request) {
        const data = MsgMigrateContract.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "MigrateContract", data);
        return promise.then(data => MsgMigrateContractResponse.decode(new BinaryReader(data)));
    }
    updateAdmin(request) {
        const data = MsgUpdateAdmin.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateAdmin", data);
        return promise.then(data => MsgUpdateAdminResponse.decode(new BinaryReader(data)));
    }
    clearAdmin(request) {
        const data = MsgClearAdmin.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "ClearAdmin", data);
        return promise.then(data => MsgClearAdminResponse.decode(new BinaryReader(data)));
    }
    updateInstantiateConfig(request) {
        const data = MsgUpdateInstantiateConfig.encode(request).finish();
        const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateInstantiateConfig", data);
        return promise.then(data => MsgUpdateInstantiateConfigResponse.decode(new BinaryReader(data)));
    }
}
//# sourceMappingURL=tx.rpc.msg.js.map