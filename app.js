/**
 * Created by zhanghaitao on 17/3/14.
 */
// 引入模块
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const templating  = require('./utils/nunjucks.js');
const xmlParse = require('./middleware/xmlParse')
// 导入controller middleware:
const controller = require('./controller');
const isProduction = process.env.NODE_ENV === 'production';
const config = require('./config/config');
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (! isProduction) {
    const staticM = require('koa-static');
    app.use(staticM(__dirname));
}

app.use(xmlParse())
.use(bodyParser())
    .use(templating('views', {
        noCache: !isProduction,
        watch: !isProduction
    }))
    .use(controller());
app.listen(config.base.port);
console.log('listening on port '+config.base.port);

