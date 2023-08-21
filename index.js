const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const CoinGecko = require('coingecko-api');

const config = require('./config/default.json')

const bot = new Telegraf(config.token);
bot.start((ctx) => ctx.reply('Welcome'));
bot.on(message('sticker'), (ctx) => {
        bitcoin_price().then(res => ctx.reply(`Цена битка сейчас ${res.data.bitcoin.usd} баксов`))
    });
bot.launch();

const CoinGeckoClient = new CoinGecko();

var bitcoin_price = async() => {
    let data = await CoinGeckoClient.simple.price({
                                                    ids: 'bitcoin',
                                                    vs_currencies: 'usd',
                                                    });

    return data
}



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));