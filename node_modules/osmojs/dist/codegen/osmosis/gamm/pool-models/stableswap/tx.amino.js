"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/osmosis.gamm.poolmodels.stableswap.v1beta1.MsgCreateStableswapPool": {
        aminoType: "osmosis/gamm/create-stableswap-pool",
        toAmino: tx_1.MsgCreateStableswapPool.toAmino,
        fromAmino: tx_1.MsgCreateStableswapPool.fromAmino
    },
    "/osmosis.gamm.poolmodels.stableswap.v1beta1.MsgStableSwapAdjustScalingFactors": {
        aminoType: "osmosis/gamm/stableswap-adjust-scaling-factors",
        toAmino: tx_1.MsgStableSwapAdjustScalingFactors.toAmino,
        fromAmino: tx_1.MsgStableSwapAdjustScalingFactors.fromAmino
    }
};
//# sourceMappingURL=tx.amino.js.map