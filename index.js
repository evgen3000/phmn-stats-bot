import { Telegraf } from 'telegraf';
import CoinGecko from 'coingecko-api';
import { osmosis } from 'osmojs';
import 'dotenv/config';

const CoinGeckoClient = new CoinGecko();
const bot = new Telegraf(process.env.TOKEN);

const botMessageHistory = {};

bot.start((ctx) => ctx.reply('Welcome'));

bot.command('phmn', async (ctx) => {
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
        
    const botMessageInfo = await ctx.replyWithHTML(`
<strong>ATOM price:</strong> ${atomUsdPrice.toFixed(2)}$
<strong>JUNO price:</strong> ${junoUsdPrice.toFixed(2)}$
<strong>PHMN-ATOM price:</strong> ${phmnAtomPriceUsd.toFixed(2)}$
1 $PHMN  = ${phmnAtomPrice.toFixed(2)} $ATOM
1 $PHMN  = ${phmnIbcxPrice.toFixed(2)} $IBCX`);
        
    const chatId = ctx.message.chat.id
    const botCommandId = ctx.message.message_id 
    const botMessageId = botMessageInfo.message_id 
    
    if (!Object.hasOwn(botMessageHistory, chatId)) {
        botMessageHistory[chatId] = [];
    }
    botMessageHistory[chatId].push([botMessageId, botCommandId])
    
    if (botMessageHistory[chatId].length > 1) {
        ctx.telegram.deleteMessage(chatId, botMessageHistory[chatId][0][0])
        try {
            await ctx.telegram.deleteMessage(chatId, botMessageHistory[chatId][0][1])
        }
        catch (err) {
            ctx.telegram.sendMessage(chatId, "Give this bot admin role to delete an old bot commands")
        }
        botMessageHistory[chatId].shift()
    };
    console.log(botMessageHistory)
})
bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));