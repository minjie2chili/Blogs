/*
 * @Author: leiminjie
 * @Date: 2020-10-15 17:33:41
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-10-15 17:42:11
 */
var begin = process.argv[2];
console.log("i am worker " + begin);

process.on("message", (msg) => {
  console.log("from parent ", msg);
  process.exit();
});
process.send({ hello: "parent" });
