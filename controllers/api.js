const reqApi = require('../utils/reqApi.js');
var Joke = async (ctx, next) => {
    console.log(ctx.query);
    data = JSON.stringify(ctx.query);
    urlText = 'http://v.juhe.cn/joke/randJoke.php';
    urlPic = 'http://v.juhe.cn/joke/randJoke.php';//随机
    
    juheKEY = '8560ad007b5fb4ce2d18f6d912e0a17e';

    var dataP = JSON.parse(data);
    dataP.key = juheKEY;
    let mm;
    if(dataP.type =='pic'){
        url = urlPic;
        mm = await reqApi(url, dataP);
    }else{
        url = urlText;
        mm = await reqApi(url, dataP);
    }
    ctx.response.body = mm;
}
module.exports = {
    'GET /api/Joke': Joke
}