const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
    channelAccessToken: 'ovbpoqGP/Fy5is/rGcT6BtboGtvrGakyP1Rkslse3IuCRvnUZ4MMEVIjBhfsyJZeC23Iis6KapcdLrMIug/jPEGa7SjU+fzJ8KKc1VrE1fSLKk9YxS27A5UqM8pyz9TH08s3Y8jKjRweZw8LV9BqnQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'fb2f25eda69ebc51cf2dc5a4d2c9d174'
};
const client = new line.Client(lineConfig);
const app = express();

app.listen(8080, function () {
    console.log('App now running on port', this.address().port);
});

app.post('/', line.middleware(lineConfig), function (req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(function (result) {
            res.json(result);
        });
});

function handleEvent(event) {
    switch (event.type) {
        case 'join':
        case 'follow':
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: '你好請問我們認識嗎?'
            });
        case 'message':
            switch (event.message.type) {
                case 'text':
                    return client.replyMessage(event.replyToken, {
                        type: 'text',
                        text: (event.message.text + '~*')
                    });
            }
    }
}
