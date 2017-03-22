const fs = require('fs');
var config = {
    base:{
        port:3456
    },
    mysql:{
        dialect: 'mysql',
        database: 'myDB',
        username: 'root',
        password: '123456',
        host: '127.0.0.1',
        port: 3306
    },
    wx: {
        token: 'weixin',
        appid: 'xxx',
        secret:'123',
        encodingAESKey: 'xxx',
        access_Token:''
    }
};
var JsonObj=JSON.parse(fs.readFileSync('./wxToken.json'));
        console.log(JsonObj);
module.exports = config;