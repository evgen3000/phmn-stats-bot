const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const  CoinGecko  = require('coingecko-api');
const { osmosis } = require('osmojs')

const config = require('./config/default.json')

const CoinGeckoClient = new CoinGecko();
const REST_ENDPOINT = 'https://lcd.osmosis.zone';

const prices = async() => {
    let pricesData = await CoinGeckoClient.simple.price({
                                                    ids: ['cosmos', 'juno-network'], 
                                                    vs_currencies: 'usd',
                                                    });
                                                    
    const client = await osmosis.ClientFactory.createLCDClient({ restEndpoint: REST_ENDPOINT });
    const phmnatomPool = await client.osmosis.gamm.v1beta1.pool({poolId: '867'})
    const atomAmountInphmnatomPool = phmnatomPool.pool.pool_assets[0].token.amount
    const phmnAmountInphmnatomPool = phmnatomPool.pool.pool_assets[1].token.amount
    const phmnatomPrice = atomAmountInphmnatomPool / phmnAmountInphmnatomPool
    const atomusdPrice = pricesData.data.cosmos.usd
    const phmnatomPriceusd = atomAmountInphmnatomPool / phmnAmountInphmnatomPool * atomusdPrice

    const junousdPrice = pricesData.data['juno-network'].usd

    const phmnibcxPool = await client.osmosis.gamm.v1beta1.pool({poolId: '1042'})
    const ibcxAmountInphmnatomPool = phmnatomPool.pool.pool_assets[0].token.amount
    const phmnAmountInphmnibcxPool = phmnatomPool.pool.pool_assets[1].token.amount
    const phmnibcxPrice = atomAmountInphmnatomPool / phmnAmountInphmnatomPool

    return [atomusdPrice, junousdPrice, phmnatomPriceusd, phmnatomPrice, phmnibcxPrice]
} 

const bot = new Telegraf(config.token);
bot.start((ctx) => ctx.reply('Welcome'));
bot.command('phmn', (ctx) => {
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