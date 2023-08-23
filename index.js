import { Telegraf } from 'telegraf';
import CoinGecko from 'coingecko-api';
import { osmosis } from 'osmojs';
import 'dotenv/config';

const CoinGeckoClient = new CoinGecko();

const prices = async() => {
    let pricesData = await CoinGeckoClient.simple.price({
                                                    ids: ['cosmos', 'juno-network'], 
                                                    vs_currencies: 'usd',
                                                    });
                                                    
    const client = await osmosis.ClientFactory.createLCDClient({ restEndpoint: process.env.REST_ENDPOINT_OSMOSIS });
    const phmnAtomPool = await client.osmosis.gamm.v1beta1.pool({poolId: '867'})
    const atomAmountInPhmnAtomPool = phmnAtomPool.pool.pool_assets[0].token.amount
    const phmnAmountInPhmnAtomPool = phmnAtomPool.pool.pool_assets[1].token.amount
    const phmnAtomPrice = atomAmountInPhmnAtomPool / phmnAmountInPhmnAtomPool
    const atomUsdPrice = pricesData.data.cosmos.usd
    const phmnAtomPriceUsd = atomAmountInPhmnAtomPool / phmnAmountInPhmnAtomPool * atomUsdPrice

    const junoUsdPrice = pricesData.data['juno-network'].usd

    const phmnIbcxPool = await client.osmosis.gamm.v1beta1.pool({poolId: '1042'})
    const ibcxAmountInPhmnIbcxPool =  phmnIbcxPool.pool.pool_assets[0].token.amount
    const phmnAmountInPhmnIbcxPool =  phmnIbcxPool.pool.pool_assets[1].token.amount
    const phmnIbcxPrice = ibcxAmountInPhmnIbcxPool / phmnAmountInPhmnIbcxPool

    return [atomUsdPrice, junoUsdPrice, phmnAtomPriceUsd, phmnAtomPrice, phmnIbcxPrice]
} 

const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.command('phmn', async (ctx) => {
        prices().then(data => ctx.replyWithHTML(`
<strong>ATOM price:</strong> ${data[0].toFixed(2)}$
<strong>JUNO price:</strong> ${data[1].toFixed(2)}$
<strong>PHMN-ATOM price:</strong> ${data[2].toFixed(2)}$
1 $PHMN  = ${data[3].toFixed(2)} $ATOM
1 $PHMN  = ${data[4].toFixed(2)} $IBCX`
    ));
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));