/*
 * @Author: leiminjie
 * @Date: 2020-11-17 10:46:31
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-11-17 10:55:38
 */
const Koa3 = require("./Koa3");
const app = new Koa3();

const middleWare1 = function(req, res) {
    res.end("I am middleWare1")
}

const middleWare2 = function(req, res) {
    res.end("I am middleWare2")
}

app.use(middleWare1);
app.use(middleWare2);

app.listen(8000)