/*
 * @Author: leiminjie
 * @Date: 2020-10-15 17:33:47
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-10-15 17:42:01
 */
var child_process = require("child_process");
var worker = child_process.fork("worker.js", ["args12"]);
worker.on("exit", function () {
  console.log("child process exit");
});
worker.send({ hello: "child" });
worker.on("message", (msg) => console.log("from child", msg));
