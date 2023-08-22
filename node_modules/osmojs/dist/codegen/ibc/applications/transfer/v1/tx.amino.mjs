//@ts-nocheck
import { MsgTransfer } from "./tx";
export const AminoConverter = {
    "/ibc.applications.transfer.v1.MsgTransfer": {
        aminoType: "cosmos-sdk/MsgTransfer",
        toAmino: MsgTransfer.toAmino,
        fromAmino: MsgTransfer.fromAmino
    }
};
//# sourceMappingURL=tx.amino.js.map