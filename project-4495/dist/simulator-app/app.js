const simulatorService = require('./simulator-service');
const _ = require('lodash');

const express = require("express");
const app = express();

const STATUSES = {
  SUCCESS: 0,
  FAILED: 1
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/simulator/start", (req, res, next) => {
  simulatorService.start();

  let json = {
    status: STATUSES.SUCCESS,
    message: 'Simulator successfully starts'
  }
  res.json(json);
});

app.get("/simulator/stop", (req, res, next) => {
  simulatorService.stop();
  let json = {
    status: STATUSES.SUCCESS,
    message: 'Simulator successfully stops'
  }
  res.json(json);
});
