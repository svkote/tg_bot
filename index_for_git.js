const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const Cron = require('cron').CronJob;
const request = require('request');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    console.log(msg);
    let chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Ваше сообщение получено');
    console.log(chatId);
});

new Cron('* * * * * *', function(){
    console.log('Крон запущен');
    const id = 157498184;
    const url = 'http://umorili.herokuapp.com/api/random?';
    request(url, function(error, response, body) {
        let data = JSON.parse(body);
        bot.sendMessage(id, entities.decode(data[0].elementPureHtml));
        console.log(entities.decode(data[0].elementPureHtml));
    })
}, null, true, 'America/Los_Angeles');