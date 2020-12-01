/*
 * @Author: leiminjie
 * @Date: 2020-10-19 15:16:23
 * @LastEditors: leiminjie
 * @LastEditTime: 2020-10-19 15:45:54
 */
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("time:", Date.now());
});

app.use("/user/:id", (req, res, next) => {
  console.log("request type", req.method);
});

app.listen(3000, (port) => console.log("listen port at ", port));
