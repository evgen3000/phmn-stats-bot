import { BinaryReader } from "../../../../binary";
import { MsgChannelOpenInit, MsgChannelOpenInitResponse, MsgChannelOpenTry, MsgChannelOpenTryResponse, MsgChannelOpenAck, MsgChannelOpenAckResponse, MsgChannelOpenConfirm, MsgChannelOpenConfirmResponse, MsgChannelCloseInit, MsgChannelCloseInitResponse, MsgChannelCloseConfirm, MsgChannelCloseConfirmResponse, MsgRecvPacket, MsgRecvPacketResponse, MsgTimeout, MsgTimeoutResponse, MsgTimeoutOnClose, MsgTimeoutOnCloseResponse, MsgAcknowledgement, MsgAcknowledgementResponse } from "./tx";
export class MsgClientImpl {
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
        const data = MsgChannelOpenInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenInit", data);
        return promise.then(data => MsgChannelOpenInitResponse.decode(new BinaryReader(data)));
    }
    channelOpenTry(request) {
        const data = MsgChannelOpenTry.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenTry", data);
        return promise.then(data => MsgChannelOpenTryResponse.decode(new BinaryReader(data)));
    }
    channelOpenAck(request) {
        const data = MsgChannelOpenAck.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenAck", data);
        return promise.then(data => MsgChannelOpenAckResponse.decode(new BinaryReader(data)));
    }
    channelOpenConfirm(request) {
        const data = MsgChannelOpenConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenConfirm", data);
        return promise.then(data => MsgChannelOpenConfirmResponse.decode(new BinaryReader(data)));
    }
    channelCloseInit(request) {
        const data = MsgChannelCloseInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseInit", data);
        return promise.then(data => MsgChannelCloseInitResponse.decode(new BinaryReader(data)));
    }
    channelCloseConfirm(request) {
        const data = MsgChannelCloseConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseConfirm", data);
        return promise.then(data => MsgChannelCloseConfirmResponse.decode(new BinaryReader(data)));
    }
    recvPacket(request) {
        const data = MsgRecvPacket.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "RecvPacket", data);
        return promise.then(data => MsgRecvPacketResponse.decode(new BinaryReader(data)));
    }
    timeout(request) {
        const data = MsgTimeout.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Timeout", data);
        return promise.then(data => MsgTimeoutResponse.decode(new BinaryReader(data)));
    }
    timeoutOnClose(request) {
        const data = MsgTimeoutOnClose.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "TimeoutOnClose", data);
        return promise.then(data => MsgTimeoutOnCloseResponse.decode(new BinaryReader(data)));
    }
    acknowledgement(request) {
        const data = MsgAcknowledgement.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Acknowledgement", data);
        return promise.then(data => MsgAcknowledgementResponse.decode(new BinaryReader(data)));
    }
}
//# sourceMappingURL=tx.rpc.msg.js.map