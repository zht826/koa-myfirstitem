const opMysql = require('../utils/op-mysql.js');

//api
var fn_message = async ctx => {
    ctx.set({
        'Access-Control-Allow-Origin': '*'
    });
    let content,queryData;
    content = ctx.query;
    if(ctx.params.api=='queryData'){
        let sql = 'SELECT * FROM MessageBoard WHERE name LIKE ?'
        let sqlData = [content.name];
        queryData = await opMysql.getMysqldata(sql, sqlData);
        console.log(queryData);
        if(queryData==''){
            ctx.body = {
                respCode:'0022',
                respDesc:'未查询到该用户留言！'
            };
        }else{
            ctx.body = {
                respCode:'0000',
                respDesc:'',
                data:queryData
            };
        }
    }else if(ctx.params.api=='addData'){
        let sql = 'INSERT INTO MessageBoard(id,name,qq,email,msg) VALUES(0,?,?,?,?)';
        let sqlData = [content.name,content.qq,content.email,content.msg];
        // let sqlData = ['gao','12345685','123333@qq.com','啦啦啦啦啦啦'];
        console.log(sqlData);
        queryData = await opMysql.getMysqldata(sql, sqlData);
        if(!queryData==''){
            ctx.body = {
                respCode:'0000',
                respDesc:'留言成功',
                data:queryData
            };
        }else{
            ctx.body = {
                respCode:'0022',
                respDesc:'留言失败，请重试！'
            };
        }
    }
};
module.exports = {
    'GET /MessageBoard/:api' : fn_message 
}