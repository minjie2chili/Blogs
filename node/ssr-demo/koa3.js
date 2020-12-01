/*
 * @Author: leiminjie
 * @Date: 2020-11-17 10:45:55
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-11-17 11:30:54
 */
const http = require('http');
class Koa3{
    constructor(){
        this.middleWareList = [];
    }
    use(fn){
        this.middleWareList.push(fn)
    }
    listen(port){
        http.createServer((req ,res) => {
            this.middleWareList.forEach(fn=>fn(req, res))
        }).listen(port)
    }
}
module.exports = Koa3;