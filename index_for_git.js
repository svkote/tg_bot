const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const Cron = require('cron').CronJob;
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
    bot.sendMessage(chatId, resp);
});


new Cron('0 * * * * *', function(){
    console.log('Крон запущен');
}, null, true, 'America/Los_Angeles');
  
  
  
bot.on('message', (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Ваше сообщение получено');
    console.log(chatId);
});