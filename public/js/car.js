var Car = function() {

  var defaultTemp = 20;

  function showTemp (temp) {
    $("#car-temp").text(temp);
  }

  function setSlider (temp) {
    $("#car-slider").slider("value", temp);
  }

  function getCarTemp () {
    console.log("getting car temp");
    var temp = 21; // fake house temp
    showTemp(temp);
    setSlider(temp);
  }

  $("#car-slider").slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 50,
    value: defaultTemp,
    step: 0.5,
    slide: function( event, ui ) {
      showTemp($("#car-slider").slider("value"));
    },
    stop: function( event, ui ) {
      console.log("CHANGE TEMP OF CAR");
      showTemp($("#car-slider").slider("value"));
    }
  });

  showTemp(defaultTemp);
  $("#car-default-button").click(getCarTemp);

};

$(document).ready(function () {
  var car = new Car();
});
