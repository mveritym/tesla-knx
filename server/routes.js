var http = require("http");
var express = require('express');
var router = express.Router();

var teslams = require('teslams');
var creds = require('../credentials.js');

router.get('/tesla', function(req, res) {
  teslams.get_vid({ email: creds.username, password: creds.password }, function (id) {
  	teslams.get_vehicle_state(id , function (data) {
  		res.json(data);
  	});
  });
});

module.exports = router;
