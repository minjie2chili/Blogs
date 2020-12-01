/*
 * @Author: leiminjie
 * @Date: 2020-11-18 11:13:23
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-11-18 11:26:31
 */
const koa = require('koa');
const koaBody = require('koa-bodyparser');
const koaRouter = require('koa-router');

const router = new koaRouter();

router.post('/', async (ctx, next) => {
    ctx.body="222"
})

const app = new koa();
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)