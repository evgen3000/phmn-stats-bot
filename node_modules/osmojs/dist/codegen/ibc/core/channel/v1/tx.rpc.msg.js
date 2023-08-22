"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = void 0;
const binary_1 = require("../../../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.channelOpenInit = this.channelOpenInit.bind(this);
        this.channelOpenTry = this.channelOpenTry.bind(this);
        this.channelOpenAck = this.channelOpenAck.bind(this);
        this.channelOpenConfirm = this.channelOpenConfirm.bind(this);
        this.channelCloseInit = this.channelCloseInit.bind(this);
        this.channelCloseConfirm = this.channelCloseConfirm.bind(this);
        this.recvPacket = this.recvPacket.bind(this);
        this.timeout = this.timeout.bind(this);
        this.timeoutOnClose = this.timeoutOnClose.bind(this);
        this.acknowledgement = this.acknowledgement.bind(this);
    }
    channelOpenInit(request) {
        const data = tx_1.MsgChannelOpenInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenInit", data);
        return promise.then(data => tx_1.MsgChannelOpenInitResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelOpenTry(request) {
        const data = tx_1.MsgChannelOpenTry.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenTry", data);
        return promise.then(data => tx_1.MsgChannelOpenTryResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelOpenAck(request) {
        const data = tx_1.MsgChannelOpenAck.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenAck", data);
        return promise.then(data => tx_1.MsgChannelOpenAckResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelOpenConfirm(request) {
        const data = tx_1.MsgChannelOpenConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenConfirm", data);
        return promise.then(data => tx_1.MsgChannelOpenConfirmResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelCloseInit(request) {
        const data = tx_1.MsgChannelCloseInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseInit", data);
        return promise.then(data => tx_1.MsgChannelCloseInitResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelCloseConfirm(request) {
        const data = tx_1.MsgChannelCloseConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseConfirm", data);
        return promise.then(data => tx_1.MsgChannelCloseConfirmResponse.decode(new binary_1.BinaryReader(data)));
    }
    recvPacket(request) {
        const data = tx_1.MsgRecvPacket.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "RecvPacket", data);
        return promise.then(data => tx_1.MsgRecvPacketResponse.decode(new binary_1.BinaryReader(data)));
    }
    timeout(request) {
        const data = tx_1.MsgTimeout.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Timeout", data);
        return promise.then(data => tx_1.MsgTimeoutResponse.decode(new binary_1.BinaryReader(data)));
    }
    timeoutOnClose(request) {
        const data = tx_1.MsgTimeoutOnClose.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "TimeoutOnClose", data);
        return promise.then(data => tx_1.MsgTimeoutOnCloseResponse.decode(new binary_1.BinaryReader(data)));
    }
    acknowledgement(request) {
        const data = tx_1.MsgAcknowledgement.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Acknowledgement", data);
        return promise.then(data => tx_1.MsgAcknowledgementResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
//# sourceMappingURL=tx.rpc.msg.js.map