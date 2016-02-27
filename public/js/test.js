var baos = new BaosLib();

baos.API_SetIpAddress('192.168.0.252');

baos.API_SetCallbackRespRcvd(respRcvd);
baos.API_SetCallbackIndicationUpdate(indicationUpdate);
baos.API_SetCallbackInvalidSettings(invalidSettings);
baos.API_SetCallbackTransmitError(transmitError);

function getHouseTemp () {
  console.log("getting house temp");
  baos.API_GetDatapointValue(10, 2, "DPT9");
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
