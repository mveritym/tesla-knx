var House = function() {

  var baos = new BaosLib();
  var defaultTemp = 20;

  function showTemp (temp) {
    $("#house-temp").text(temp);
  }

  function setSlider (temp) {
    $("#house-slider").slider("value", temp);
  }

  function getHouseTemp () {
    console.log("getting house temp");
    // var temp = baos.API_GetDatapointValue(10, 2, "DPT9"); – CAN"T DO THIS UNTIL HOUSE CONNECTION IS WORKING
    var temp = 21; // fake current temp of house
    showTemp(temp);
    setSlider(temp);
  }

  function setHouseTemp () {
    console.log("setting house temp");
    baos.API_SetDatapointValue(10, "DPT9", "SetSendVal", 2, "20.0");
  }

  function respRcvd (res) {
    console.log("response received");
    console.log(res);
  }

  function indicationUpdate (res) {
    console.log("indication update");
    console.log(res);
  }

  function invalidSettings (res) {
    console.log("invalid settings");
  }

  function transmitError (res) {
    console.log("transmit error");
    console.log(res);
  }

  function initSlider () {
    $("#house-slider").slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 50,
      value: defaultTemp,
      step: 0.5,
      slide: function( event, ui ) {
        showTemp($("#house-slider").slider("value"));
      },
      stop: function( event, ui ) {
        console.log("CHANGE TEMP OF HOUSE");
        showTemp($("#house-slider").slider("value"));
      }
    });
  }

  // ON LOAD

  baos.API_SetIpAddress('192.168.0.252');
  baos.API_SetCallbackRespRcvd(respRcvd);
  baos.API_SetCallbackIndicationUpdate(indicationUpdate);
  baos.API_SetCallbackInvalidSettings(invalidSettings);
  baos.API_SetCallbackTransmitError(transmitError);

  initSlider();
  showTemp(defaultTemp);

  $("#house-default-button").click(getHouseTemp);
};

$(document).ready(function () {
  var house = new House();
});
