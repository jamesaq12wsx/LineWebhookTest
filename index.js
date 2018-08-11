let linebot = require('linebot'),
    express = require('express');
// const config = require('./config.json'),
    // util = require('util');
let bot = linebot({
    channelId: '1599437019',
    channelSecret: 'fb2f25eda69ebc51cf2dc5a4d2c9d174',
    channelAccessToken: 'ovbpoqGP/Fy5is/rGcT6BtboGtvrGakyP1Rkslse3IuCRvnUZ4MMEVIjBhfsyJZeC23Iis6KapcdLrMIug/jPEGa7SjU+fzJ8KKc1VrE1fSLKk9YxS27A5UqM8pyz9TH08s3Y8jKjRweZw8LV9BqnQdB04t89/1O/w1cDnyilFU='
});
const linebotParser = bot.parser(),
    app = express();

bot.on('message', function (event) {
    // 把收到訊息的 event 印出來
    console.log(event);

    var userProfile = LineBot.getUserProfile(event.source.userId);

    console.log(userProfile);

    // 重複 client 輸入的內容
    if (event.message.type = 'text') {
        var msg = event.message.text;
        event.reply(msg).then(function (data) {
            // success
            console.log('bot reply:' + msg);
        }).catch(function (error) {
            // error
            console.log('error');
        });
    }
    else if(event.message.type == 'sticker'){
        var stiker = event.message;

        console.log(stiker);

        event.reply({
            type: 'sticker',
            packageId: event.message.packageId,
            stickerId: event.message.stickerId
        }).then(function(data){
            console.log('bot reply sticker');
        }).catch(function(error){
            console.log('bot reply sticker error');
        });
    }
});

//  follow event
bot.on('follow', function(event){
    console.log(event);



    event.reply('歡迎追蹤我們')
         .then(function(data){
             console.log('bot welcome message');
         })
         .catch(function(error){
             console.log('bot welcome message error');
         });

    event.reply({
        type: 'sticker',
        packageId: '1',
        stickerId: '1'
    }).then(function(data){
        console.log('bot welcome');
    }).catch(function(error){
        console.log('bot welcome error');
    });
});

bot.on('unfollow', function (event) { });

bot.on('join', function (event) { });

app.post('/webhook', linebotParser);

// 在 localhost 走 80 port
let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("My Line bot App running on port", port);
});
