var fn_hello = async (ctx, next) => {
    // let name = ctx.query.name || ['小名','小黑','小白'];
    ctx.render('hello.html', {
        header: 'Hello',
        body: 'bla bla bla...',
        footer:'footer'
    });
    // ctx.response.body = s;
}
module.exports = {
    'GET /hello': fn_hello
}