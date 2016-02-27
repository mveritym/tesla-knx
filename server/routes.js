var http = require("http");
var express = require('express');
var router = express.Router();

var teslams = require('teslams');
var creds = require('../credentials.js');

function setHouse(req, res) {
  teslams.get_vid({ email: creds.username, password: creds.password }, function (id) {
    teslams.get_climate_state(id , function (data) {
      var temperature = data.driver_temp_setting;
      //use temp to set house variables
      res.json(data);
    });
  });
}

router.get('/set_house', setHouse);

module.exports = router;
