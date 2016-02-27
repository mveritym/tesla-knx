var http = require("http");
var express = require('express');
var router = express.Router();

var tesla_api = 'https://private-anon-0ceef6f72-timdorr.apiary-mock.com/api/1/vehicles/1/';

router.post('/tesla_climate', function(req, res) {
  http.post(tesla_api + 'commands/')
  res.send('hello world');
});

module.exports = router;
