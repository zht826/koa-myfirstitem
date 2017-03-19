/**
 * Created by zhanghaitao on 17/3/14.
 */
// 引入模块
const Koa = require('koa');
const { query } = require('./async-db');
let router = require('koa-router')();
const app = new Koa();
let content,queryData;

//查询数据库-操作函数
async function selectAllData( sql, sqlData ) {
  let dataList = await query( sql, sqlData );
  return dataList
}
async function getData(sql, sqlData) {
  let dataList = await selectAllData(sql, sqlData);
  console.log( dataList );
  return dataList
}

//query
router.get('/api/:api', async ctx => {
    ctx.set({
        'Access-Control-Allow-Origin': '*'
    });
    content = ctx.query;
    if(ctx.params.api=='queryData'){
        let sql = 'SELECT * FROM MessageBoard WHERE name LIKE ?'
        let sqlData = [content.name];
        queryData = await getData(sql, sqlData);
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
        queryData = await getData(sql, sqlData);
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
});

// add
// router.get('/addData', async ctx => {
//     ctx.set({
//         'Access-Control-Allow-Origin': '*'
//     });
//     content = ctx.query;
//     let sql = 'INSERT INTO MessageBoard(id,name,qq,email,msg) VALUES(0,?,?,?,?)';
//     let sqlData = [content.name,content.qq,content.email,content.msg];
//     // let sqlData = ['gao','12345685','123333@qq.com','啦啦啦啦啦啦'];
//     console.log(sqlData);
//     queryData = await getData(sql, sqlData);
//     if(!queryData==''){
//         ctx.body = {
//             respCode:'0000',
//             respDesc:'留言成功',
//             data:queryData
//         };
//     }else{
//         ctx.body = {
//             respCode:'0022',
//             respDesc:'留言失败，请重试！'
//         };
//     }
// });

router.get('/haha/:api',async (ctx,next) => {  
    console.log(ctx.params.api);
    ctx.body ="all users list ok!";
}); 
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3456);

