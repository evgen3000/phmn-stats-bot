"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRpcQueryExtension = exports.QueryClientImpl = void 0;
const binary_1 = require("../../../../binary");
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./query");
class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.channel = this.channel.bind(this);
        this.channels = this.channels.bind(this);
        this.connectionChannels = this.connectionChannels.bind(this);
        this.channelClientState = this.channelClientState.bind(this);
        this.channelConsensusState = this.channelConsensusState.bind(this);
        this.packetCommitment = this.packetCommitment.bind(this);
        this.packetCommitments = this.packetCommitments.bind(this);
        this.packetReceipt = this.packetReceipt.bind(this);
        this.packetAcknowledgement = this.packetAcknowledgement.bind(this);
        this.packetAcknowledgements = this.packetAcknowledgements.bind(this);
        this.unreceivedPackets = this.unreceivedPackets.bind(this);
        this.unreceivedAcks = this.unreceivedAcks.bind(this);
        this.nextSequenceReceive = this.nextSequenceReceive.bind(this);
    }
    channel(request) {
        const data = query_1.QueryChannelRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channel", data);
        return promise.then(data => query_1.QueryChannelResponse.decode(new binary_1.BinaryReader(data)));
    }
    channels(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryChannelsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channels", data);
        return promise.then(data => query_1.QueryChannelsResponse.decode(new binary_1.BinaryReader(data)));
    }
    connectionChannels(request) {
        const data = query_1.QueryConnectionChannelsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ConnectionChannels", data);
        return promise.then(data => query_1.QueryConnectionChannelsResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelClientState(request) {
        const data = query_1.QueryChannelClientStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelClientState", data);
        return promise.then(data => query_1.QueryChannelClientStateResponse.decode(new binary_1.BinaryReader(data)));
    }
    channelConsensusState(request) {
        const data = query_1.QueryChannelConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelConsensusState", data);
        return promise.then(data => query_1.QueryChannelConsensusStateResponse.decode(new binary_1.BinaryReader(data)));
    }
    packetCommitment(request) {
        const data = query_1.QueryPacketCommitmentRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitment", data);
        return promise.then(data => query_1.QueryPacketCommitmentResponse.decode(new binary_1.BinaryReader(data)));
    }
    packetCommitments(request) {
        const data = query_1.QueryPacketCommitmentsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitments", data);
        return promise.then(data => query_1.QueryPacketCommitmentsResponse.decode(new binary_1.BinaryReader(data)));
    }
    packetReceipt(request) {
        const data = query_1.QueryPacketReceiptRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketReceipt", data);
        return promise.then(data => query_1.QueryPacketReceiptResponse.decode(new binary_1.BinaryReader(data)));
    }
    packetAcknowledgement(request) {
        const data = query_1.QueryPacketAcknowledgementRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgement", data);
        return promise.then(data => query_1.QueryPacketAcknowledgementResponse.decode(new binary_1.BinaryReader(data)));
    }
    packetAcknowledgements(request) {
        const data = query_1.QueryPacketAcknowledgementsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgements", data);
        return promise.then(data => query_1.QueryPacketAcknowledgementsResponse.decode(new binary_1.BinaryReader(data)));
    }
    unreceivedPackets(request) {
        const data = query_1.QueryUnreceivedPacketsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedPackets", data);
        return promise.then(data => query_1.QueryUnreceivedPacketsResponse.decode(new binary_1.BinaryReader(data)));
    }
    unreceivedAcks(request) {
        const data = query_1.QueryUnreceivedAcksRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedAcks", data);
        return promise.then(data => query_1.QueryUnreceivedAcksResponse.decode(new binary_1.BinaryReader(data)));
    }
    nextSequenceReceive(request) {
        const data = query_1.QueryNextSequenceReceiveRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceReceive", data);
        return promise.then(data => query_1.QueryNextSequenceReceiveResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        channel(request) {
            return queryService.channel(request);
        },
        channels(request) {
            return queryService.channels(request);
        },
        connectionChannels(request) {
            return queryService.connectionChannels(request);
        },
        channelClientState(request) {
            return queryService.channelClientState(request);
        },
        channelConsensusState(request) {
            return queryService.channelConsensusState(request);
        },
        packetCommitment(request) {
            return queryService.packetCommitment(request);
        },
        packetCommitments(request) {
            return queryService.packetCommitments(request);
        },
        packetReceipt(request) {
            return queryService.packetReceipt(request);
        },
        packetAcknowledgement(request) {
            return queryService.packetAcknowledgement(request);
        },
        packetAcknowledgements(request) {
            return queryService.packetAcknowledgements(request);
        },
        unreceivedPackets(request) {
            return queryService.unreceivedPackets(request);
        },
        unreceivedAcks(request) {
            return queryService.unreceivedAcks(request);
        },
        nextSequenceReceive(request) {
            return queryService.nextSequenceReceive(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
//# sourceMappingURL=query.rpc.Query.js.map