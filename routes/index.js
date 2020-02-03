var express = require('express');
var router = express.Router();
const request = require('request')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken
  reply(reply_token)
  res.sendStatus(200)
})

function reply(reply_token) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'a6Uqq2JHzdXg0k6ZvTGy2lbWfyC/p2fqPqep3mMvQpY+y/EK1dZcdfPqJpwYCdu0dQh9pvwl6AUxLYZZ8E6OmhO8WgrfrqEcaBEEP/6NKVU9BIN/5nx5TGb3hXSH4ijhDrbKDAjYRHaFBtZ8xXlAOQdB04t89/1O/w1cDnyilFU='
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'Hello'
    },
    {
      type: 'text',
      text: 'How are you?'
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}
module.exports = router;
