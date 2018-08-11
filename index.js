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
});
app.post('/webhook', linebotParser);
// 在 localhost 走 8080 port
let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("My Line bot App running on port", port);
});
