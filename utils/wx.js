// some wx fn
const encode = require('./encode')
const xml = require('./xmlTool')

// 返回 true ／ false
exports.auth = (ctx) => {
    const token="weixin",
          signature = ctx.query.signature,
          timestamp = ctx.query.timestamp,
          nonce = ctx.query.nonce
        
        // 字典排序
        const arr = [token, timestamp, nonce].sort()
        const result = encode.sha1(arr.join(''))

        if (result === signature) {
            return true
        } else {
            return false
        }
}

exports.message = {
    text (msg, content) {
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: msg.MsgType,
                Content: content
            }
        })
    },
    
    music (msg, content){
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'music',
                Music:{
                    Title: content.title,
                    Description: content.Description,
                    MusicUrl: content.MusicUrl,
                    HQMusicUrl: content.HQMusicUrl,
                    ThumbMediaId: content.ThumbMediaId
                }
            }
        })
    }
}