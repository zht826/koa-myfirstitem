// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
const request = require('request');
const fs = require('fs');
module.exports = function(appid,secret){
    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        
        fs.writeFileSync('./wxToken.json',JSON.stringify(body));
        var JsonObj=JSON.parse(fs.readFileSync('./wxToken.json'));
        console.log(JsonObj);
    });
}

