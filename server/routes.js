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

function setCarClimate(req, res) {
  // var temp = somethinggained from house
  var temp = 30;
  teslams.get_vid({ email: creds.username, password: creds.password }, function (id) {
    teslams.set_temperature({ id: id, dtemp: temp, ptemp: temp}, function(data) {
      teslams.auto_conditioning({ id: id, climate: 1}, function(data) {
        res.json(data);
      });
    });
  });
}

// function verifyCarLocation() {
//   teslams.get_vid({ email: creds.username, password: creds.password }, function (id) {
//     teslams.
//   });
// }

router.get('/set_house', setHouse);

router.get('/update_car', setCarClimate);

module.exports = router;
