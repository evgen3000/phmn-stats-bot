import { Telegraf, Scenes, session, Markup } from 'telegraf';
import CoinGecko from 'coingecko-api';
import { osmosis } from 'osmojs';
import {toHex, fromHex, toBech32, fromBech32} from "@cosmjs/encoding";
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
    
    const phmnTokenDenom = 'ibc/D3B574938631B0A1BA704879020C696E514CFADAA7643CDE4BD5EB010BDE327B' 
    const atomTokenDenom = 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2'
    const ibcxTokenDenom = 'factory/osmo14klwqgkmackvx2tqa0trtg69dmy0nrg4ntq4gjgw2za4734r5seqjqm4gm/uibcx'  
        
    const client = await osmosis.ClientFactory.createLCDClient({
      restEndpoint: "https://osmosis-api.polkachu.com",
    });
    const phmnAtomPool = await client.osmosis.gamm.v1beta1.pool({
      poolId: "1255",
    });
    const atomAmountInPhmnAtomPool = phmnAtomPool.pool.pool_assets.find(obj => obj.token.denom === atomTokenDenom).token.amount
    const phmnAmountInPhmnAtomPool = phmnAtomPool.pool.pool_assets.find(obj => obj.token.denom === phmnTokenDenom).token.amount
    const phmnAtomPrice = atomAmountInPhmnAtomPool / phmnAmountInPhmnAtomPool
    const atomUsdPrice = pricesData.data.cosmos.usd
    const phmnAtomPriceUsd = atomAmountInPhmnAtomPool / phmnAmountInPhmnAtomPool * atomUsdPrice

    const junoUsdPrice = pricesData.data['juno-network'].usd

    const phmnIbcxPool = await client.osmosis.gamm.v1beta1.pool({
      poolId: "1254",
    });
    const ibcxAmountInPhmnIbcxPool =  phmnIbcxPool.pool.pool_assets.find(obj => obj.token.denom === ibcxTokenDenom).token.amount
    const phmnAmountInPhmnIbcxPool =  phmnIbcxPool.pool.pool_assets.find(obj => obj.token.denom === phmnTokenDenom).token.amount
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
            ctx.telegram.sendMessage(chatId, "Give this bot the admin role to delete an old commands")
        }
        botMessageHistory[chatId].shift()
    };
})

const AddressConversionScene = new Scenes.BaseScene('conversion');
const address = [];
const { enter, leave } = Scenes.Stage
AddressConversionScene.enter((ctx) => ctx.reply('You started address conversion scene. Plese enter the address'))
AddressConversionScene.leave((ctx) => ctx.reply('I left this scene')) 
AddressConversionScene.hears('quit', leave('conversion'))
AddressConversionScene.on('text', async (ctx) => {
    try {
        let hex_address = toHex(fromBech32(`${ctx.message.text}`).data)
            address.cerberus = toBech32(`cerberus`, fromHex(`${hex_address}`));
            address.cosmos = toBech32(`cosmos`, fromHex(`${hex_address}`));
            address.chihuahua = toBech32(`chihuahua`, fromHex(`${hex_address}`));
            address.comdex = toBech32(`comdex`, fromHex(`${hex_address}`));
            address.bostrom = toBech32(`bostrom`, fromHex(`${hex_address}`));
            address.fetch = toBech32(`fetch`, fromHex(`${hex_address}`));
            address.juno = toBech32(`juno`, fromHex(`${hex_address}`));
            address.ki = toBech32(`ki`, fromHex(`${hex_address}`));
            address.like = toBech32(`like`, fromHex(`${hex_address}`));
            address.mantle = toBech32(`mantle`, fromHex(`${hex_address}`));
            address.odin = toBech32(`odin`, fromHex(`${hex_address}`));
            address.osmo = toBech32(`osmo`, fromHex(`${hex_address}`));
            address.rizon = toBech32(`rizon`, fromHex(`${hex_address}`));
            address.sif = toBech32(`sif`, fromHex(`${hex_address}`));
            address.stars = toBech32(`stars`, fromHex(`${hex_address}`));
            address.umee = toBech32(`umee`, fromHex(`${hex_address}`));
            address.tori = toBech32(`tori`, fromHex(`${hex_address}`));
            address.flix = toBech32(`omniflix`, fromHex(`${hex_address}`));
            await ctx.replyWithHTML(`Cerberus: 
<code>${address.cerberus}</code> 
Cosmos HUB: 
<code>${address.cosmos}</code>
Chihuahua: 
<code>${address.chihuahua}</code>
Comdex: 
<code>${address.comdex}</code>
Bostrom: 
<code>${address.bostrom}</code>
FetchAI: 
<code>${address.fetch}</code>
Juno: 
<code>${address.juno}</code>
Ki-chain: 
<code>${address.ki}</code>
Like: 
<code>${address.like}</code>
AssetMantle: 
<code>${address.mantle}</code>
Odin protocol: 
<code>${address.odin}</code>
Osmosis: 
<code>${address.osmo}</code>
Rizon: 
<code>${address.rizon}</code>
Sifchain: 
<code>${address.sif}</code>
Stargaze: 
<code>${address.stars}</code>
Umee: 
<code>${address.umee}</code>
Teritori:
<code>${address.tori}</code>
Omniflix
<code>${address.flix}</code>
`)
            AddressConversionScene.leave()  
    } catch (err) {1
        console.log(ctx.reply("An error has occured. Try later"))
    }
});

const stage = new Scenes.Stage([AddressConversionScene])
bot.use(session())
bot.use(stage.middleware())

bot.command('convert_address', ctx => {
    if (ctx.message.chat.id > 0) {
        ctx.scene.enter('conversion')
    } else {
        ctx.reply("This option is only available in private messages")
    }
    
})

bot.command("info", async (ctx) => {
  const botMessageInfo = await ctx.replyWithHTML(
    `<strong>PHMN contract address:</strong> <code>juno1rws84uz7969aaa7pej303udhlkt3j9ca0l3egpcae98jwak9quzq8szn2l</code>`,
    Markup.inlineKeyboard([
      [
        Markup.button.url("Dashboard", "https://phmn-stats.posthuman.digital"),
        Markup.button.url(
          "PHMN docs",
          "https://antropocosmist.medium.com/phmn-tokenomics-f3b7116331e6"
        ),
      ],
      [
        Markup.button.url(
          "DAS",
          "https://daodao.zone/dao/juno1h5ex5dn62arjwvwkh88r475dap8qppmmec4sgxzmtdn5tnmke3lqwpplgg"
        ),
        Markup.button.url("Discord", "https://discord.gg/4xsuADrA"),
        Markup.button.url("Zealy", "https://zealy.io/c/posthumandvs"),
      ],
    ])
  );

  const chatId = ctx.message.chat.id;
  const botCommandId = ctx.message.message_id;
  const botMessageId = botMessageInfo.message_id;

  if (!Object.hasOwn(botMessageHistory, chatId)) {
    botMessageHistory[chatId] = [];
  }
  botMessageHistory[chatId].push([botMessageId, botCommandId]);

  if (botMessageHistory[chatId].length > 1) {
    ctx.telegram.deleteMessage(chatId, botMessageHistory[chatId][0][0]);
    try {
      await ctx.telegram.deleteMessage(chatId, botMessageHistory[chatId][0][1]);
    } catch (err) {
      ctx.telegram.sendMessage(
        chatId,
        "Give this bot the admin role to delete an old commands"
      );
    }
    botMessageHistory[chatId].shift();
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));