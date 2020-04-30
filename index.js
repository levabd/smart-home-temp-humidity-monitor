#!/usr/bin/env node

'use strict';

const fs = require('fs');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

let lrrawdata = fs.readFileSync('lr.json');
let lr = JSON.parse(lrrawdata);

let brrawdata = fs.readFileSync('br.json');
let br = JSON.parse(brrawdata);

let cbrawdata = fs.readFileSync('cb.json');
let cb = JSON.parse(cbrawdata);

// ==== REST ZONE ====
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry'],
});

var server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/living-room/temp', function (req, res, next) {
  lrrawdata = fs.readFileSync('lr.json');
  lr = JSON.parse(lrrawdata);
  res.json(200, lr.temperature);
  next();
});

server.get('/bedroom/temp', function (req, res, next) {
  brrawdata = fs.readFileSync('br.json');
  br = JSON.parse(brrawdata);
  res.json(200, br.temperature);
  next();
});

server.get('/cabinet/temp', function (req, res, next) {
  cbrawdata = fs.readFileSync('cb.json');
  cb = JSON.parse(cbrawdata);
  res.json(200, cb.temperature);
  next();
});

server.get('/living-room/humidity', function (req, res, next) {
  lrrawdata = fs.readFileSync('lr.json');
  lr = JSON.parse(lrrawdata);
  res.json(200, lr.humidity);
  next();
});

server.get('/bedroom/humidity', function (req, res, next) {
  brrawdata = fs.readFileSync('br.json');
  br = JSON.parse(brrawdata);
  res.json(200, br.humidity);
  next();
});

server.get('/cabinet/humidity', function (req, res, next) {
  cbrawdata = fs.readFileSync('cb.json');
  cb = JSON.parse(cbrawdata);
  res.json(200, cb.humidity);
  next();
});
server.listen(2004, function () {
  console.log('%s listening at %s', server.name, server.url);
});
