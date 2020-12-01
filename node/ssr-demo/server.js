/*
 * @Author: leiminjie
 * @Date: 2020-10-13 15:19:17
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-10-15 17:06:55
 */
var stream = require("stream");
var http = require("http");
var fs = require("fs");
const { spawn } = require("child_process");
const ls = spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
// var server = http
//   .createServer((req, res) => {
//     if (req.url === "/") {
//       var fileList = fs.readdirSync("./");
//       res.writeHead(200, { "Content-type": "text/plain" });
//       res.end(fileList.toString());
//     } else {
//       var path = "." + req.url;
//       fs.createReadStream(path).pipe(res);
//     }
//   })
//   .listen(30000);
// process.on("uncaughtException", (err) => {
//   console.log("err", err);
// });
