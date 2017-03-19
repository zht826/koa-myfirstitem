/**
 * Created by zhanghaitao on 17/3/14.
 */
// 引入模块
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const templating  = require('./utils/nunjucks.js');
// 导入controller middleware:
const controller = require('./controller');
const isProduction = process.env.NODE_ENV === 'production';

if (! isProduction) {
    const staticM = require('koa-static');
    app.use(staticM(__dirname + '/static'));
}

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))
  .use(bodyParser())
  .use(controller());
app.listen(3456);
console.log('listening on port 3456');

