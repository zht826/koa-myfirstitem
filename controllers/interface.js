const wx = require('../utils/wx')
var fn_wxYZ = async (ctx, next) => {
    ctx.set({
        'Access-Control-Allow-Origin': '*'
    });

    const result = wx.auth(ctx)
    if (result) {
        ctx.body = ctx.query.echostr
        console.log('验证成功');
    } else {
        ctx.body = { code: -1, msg: "You aren't wechat server !"}
        console.log('验证失败');
    }
};

var fn_wxHF = async (ctx, next) => {
    let msg,
    MsgType,
    result
    
    msg = ctx.req.body ? ctx.req.body.xml : ''
    console.log(msg);
    if (!msg) {
        ctx.body = 'error request.'
        return;
    }
    
    MsgType = msg.MsgType[0]

    switch (MsgType) {
        case 'text':
            if(msg.Content == '歌曲'){
                musicData={};
                musicData.title = '测试';
                musicData.Description = '测试用的descripotion';
                musicData.MusicUrl = '测试';
                musicData.HQMusicUrl = '测试';
                musicData.ThumbMediaId = '';
                result = wx.message.music(msg, musicData);
            }else{
                result = wx.message.text(msg, msg.Content)
            }
            break;
        case 'event':
            if(msg.Event[0]=='subscribe') result = wx.message.text(msg, '欢迎关注！')
            break;
        default: 
            result = 'success'
    }
    console.log(result);
    ctx.set('Content-Type', 'application/xml')
    ctx.body = result
};

module.exports = {
    'GET /interface': fn_wxYZ,
    'POST /interface': fn_wxHF
}