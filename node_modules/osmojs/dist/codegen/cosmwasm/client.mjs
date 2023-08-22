import { Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import * as cosmwasmWasmV1TxRegistry from "./wasm/v1/tx.registry";
import * as cosmwasmWasmV1TxAmino from "./wasm/v1/tx.amino";
export const cosmwasmAminoConverters = {
    ...cosmwasmWasmV1TxAmino.AminoConverter
};
export const cosmwasmProtoRegistry = [...cosmwasmWasmV1TxRegistry.registry];
export const getSigningCosmwasmClientOptions = ({ defaultTypes = defaultRegistryTypes } = {}) => {
    const registry = new Registry([...defaultTypes, ...cosmwasmProtoRegistry]);
    const aminoTypes = new AminoTypes({
        ...cosmwasmAminoConverters
    });
    return {
        registry,
        aminoTypes
    };
};
export const getSigningCosmwasmClient = async ({ rpcEndpoint, signer, defaultTypes = defaultRegistryTypes }) => {
    const { registry, aminoTypes } = getSigningCosmwasmClientOptions({
        defaultTypes
    });
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
        registry: registry,
        aminoTypes
    });
    return client;
};
//# sourceMappingURL=client.js.map