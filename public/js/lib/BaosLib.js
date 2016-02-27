function BaosLib()
{var m_strIpAddr;var m_IndicationSession=0;var m_IndFormat;var m_bEnableCallbackRespRcvd=false;var m_bEnableCallbackIndicationUpdate=false;var m_bEnableCallbackInvalidSettings=false;var m_bEnableCallbackTransmitError=false;var m_CallbackRespRcvd;var m_CallbackIndicationUpdate;var m_CallbackInvalidSettings;var m_CallbackTransmitError;this.API_SetIpAddress=function(strIpAddr)
{m_strIpAddr=strIpAddr;}
this.API_SetCallbackRespRcvd=function(strCallback)
{m_CallbackRespRcvd=strCallback;m_bEnableCallbackRespRcvd=true;}
this.API_SetCallbackIndicationUpdate=function(strCallback)
{m_CallbackIndicationUpdate=strCallback;m_bEnableCallbackIndicationUpdate=true;}
this.API_SetCallbackInvalidSettings=function(strCallback)
{m_CallbackInvalidSettings=strCallback;m_bEnableCallbackInvalidSettings=true;}
this.API_SetCallbackTransmitError=function(strCallback)
{m_CallbackTransmitError=strCallback;m_bEnableCallbackTransmitError=true;}
this.API_GetServerItem=function(strStartItem,strItemCount)
{var strUrl;if((IsIpAddrValid(m_strIpAddr))&&(IsNumber(strStartItem))&&(IsNumber(strItemCount)))
{strUrl="http://"+m_strIpAddr+"/baos/GetServerItem?ItemStart="+strStartItem+"&ItemCount="+strItemCount+"&Callback=?";$.jsonp({"url":strUrl,"success":OnObjSrvRespRcvd,"error":OnObjSrvError});}
else
{OnObjSrvInvalidSettings();}}
this.API_GetDatapointDescription=function(strDatapointStart,strDatapointCount)
{var strUrl;if((IsIpAddrValid(m_strIpAddr))&&(IsNumber(strDatapointStart))&&(IsNumber(strDatapointCount)))
{strUrl="http://"+m_strIpAddr+"/baos/GetDatapointDescription?DatapointStart="+
strDatapointStart+"&DatapointCount="+
strDatapointCount+"&Callback=?";$.jsonp({"url":strUrl,"success":OnObjSrvRespRcvd,"error":OnObjSrvError});}
else
{OnObjSrvInvalidSettings();}}
this.API_GetDescriptionString=function(strDatapointStart,strDatapointCount)
{var strUrl;if((IsIpAddrValid(m_strIpAddr))&&(IsNumber(strDatapointStart))&&(IsNumber(strDatapointCount)))
{strUrl="http://"+m_strIpAddr+"/baos/GetDescriptionString?DatapointStart="+
strDatapointStart+"&DatapointCount="+
strDatapointCount+"&Callback=?";$.jsonp({"url":strUrl,"success":OnObjSrvRespRcvd,"error":OnObjSrvError});}
else
{OnObjSrvInvalidSettings();}}
this.API_GetDatapointValue=function(strDatapointStart,strDatapointCount,strFormat,strFilter)
{var strUrl;if((IsIpAddrValid(m_strIpAddr))&&(IsNumber(strDatapointStart))&&(IsNumber(strDatapointCount)))
{strUrl="http://"+m_strIpAddr+"/baos/GetDatapointValue?DatapointStart="+
strDatapointStart+"&DatapointCount="+
strDatapointCount+"&Format=";strUrl+=strFormat;strUrl+="&Filter=";strUrl+=strFilter;strUrl+="&Callback=?";$.jsonp({"url":strUrl,"success":OnObjSrvRespRcvd,"error":OnObjSrvError});}
else
{OnObjSrvInvalidSettings();}}
this.API_SetDatapointValue=function(strDatapoint,strFormat,strCommand,strLength,strValue1,strValue2,strValue3,strValue4,strValue5,strValue6)
{var strUrl;var strValue;strLength=ConvertLength(strLength);if((IsIpAddrValid(m_strIpAddr))&&(IsNumber(strDatapoint))&&(IsNumber(strLength)))
{switch(strFormat)
{case"RAW":case"DPT1":case"DPT4":case"DPT5":case"DPT6":case"DPT7":case"DPT8":case"DPT9":case"DPT12":case"DPT13":case"DPT14":case"DPT16":strValue="&Value="+strValue1;break;case"DPT17":strValue="&Scene="+strValue1;break;case"DPT2":strValue="&Control="+strValue1+"&Value="+strValue2;break;case"DPT3":strValue="&Control="+strValue1+"&StepCode="+strValue2;break;case"DPT18":strValue="&Control="+strValue1+"&Scene="+strValue2;break;case"DPT11":strValue="&Day="+strValue1+"&Month="+strValue2+"&Year="+strValue3;break;case"DPT10":strValue="&Weekday="+strValue1+"&Hour="+strValue2+"&Minute="+strValue3+"&Second="+strValue4;break;case"DPT15":strValue="&Code="+strValue1+"&Index="+strValue2+"&FlagError="+strValue3+"&FlagPermission="+strValue4+"&FlagReadDirection="+strValue5+"&FlagEncrypted="+strValue6;break;case"DPT19":case"DPT20":break;}
strUrl="http://"+m_strIpAddr+"/baos/SetDatapointValue?Datapoint="+strDatapoint+"&Format="+strFormat+"&Command="+strCommand+"&Length="+strLength+strValue;strUrl+="&Callback=?";$.jsonp({"url":strUrl,"success":OnObjSrvRespRcvd,"error":OnObjSrvError});}
else
{OnObjSrvInvalidSettings();}}
this.API_GetParamByte=function(strByteStart,strByteCount)
{var strUrl;if((IsIpAddrValid(m_strIpAddr))&&(IsNumber(strByteStart))&&(IsNumber(strByteCount)))
{strUrl="http://"+m_strIpAddr+"/baos/GetParameterByte?ByteStart="+strByteStart+"&ByteCount="+strByteCount;strUrl+="&Callback=?";$.jsonp({"url":strUrl,"success":OnObjSrvRespRcvd,"error":OnObjSrvError});}
else
{OnObjSrvInvalidSettings();}}
this.API_IsIpAddrValid=function(strIpAddrToValidate)
{return IsIpAddrValid(strIpAddrToValidate);}
this.API_StartIndicationListener=function(strFormat)
{var strUrl;m_IndFormat=strFormat;if(m_IndicationSession!=0)
{return false;}
if((IsIpAddrValid(m_strIpAddr)))
{strUrl="http://"+m_strIpAddr+"/baos/StartIndicationSession";strUrl+="?Callback=?";$.jsonp({"url":strUrl,"success":function(data)
{if((data.Result==true)&&(data.Service=="StartIndicationSession"))
{m_IndicationSession=data.Data.SessionId;GetIndication();}},"error":OnObjSrvError});return true;}
else
{OnObjSrvInvalidSettings();}
return false;}
this.API_StopIndicationListener=function()
{var strUrl;if(m_IndicationSession==0)
{return false;}
if((IsIpAddrValid(m_strIpAddr)))
{strUrl="http://"+m_strIpAddr+"/baos/StopIndicationSession?SessionId="+
m_IndicationSession;strUrl+="&Callback=?";$.jsonp({"url":strUrl,"success":function(data)
{if((data.Result==true)&&(data.Service=="StopIndicationSession"))
{m_IndicationSession=0;}},"error":OnObjSrvError});return true;}
else
{OnObjSrvInvalidSettings();}
return false;}
function IsIpAddrValid(strIpAddrToValidate)
{var strIpAddrSub=new Array();strIpAddrSub=strIpAddrToValidate.split(".");if(strIpAddrSub.length!=4)
{return false;}
for(var nIndex=0;nIndex<strIpAddrSub.length;nIndex++)
{if(!IsNumber(strIpAddrSub[nIndex]))
{return false;}
var sub=parseInt(strIpAddrSub[nIndex],10);if((isNaN(sub))||(sub<0)||(sub>255))
{return false;}}
return true;}
function IsNumber(strToValidate)
{for(var position=0;position<strToValidate.length;position++)
{var chr=strToValidate.charAt(position)
if((chr<"0")||(chr>"9"))
{return false;}};return true;}
function ConvertLength(strLength)
{switch(strLength)
{case"1 Bit":case"2 Bit":case"4 Bit":case"1 Byte":return 1;case"2 Byte":return 2;case"3 Byte":return 3;case"4 Byte":return 4;case"6 Byte":return 6;case"8 Byte":return 8;case"14 Byte":return 14;default:return 0;}}
function GetIndication()
{var strUrl;if(m_IndicationSession==0)
{return false;}
if((IsIpAddrValid(m_strIpAddr)))
{strUrl="http://"+m_strIpAddr+"/baos/GetIndication?SessionId="+
m_IndicationSession+"&Timeout=20"+"&Format="+m_IndFormat;strUrl+="&Callback=?";$.jsonp({"url":strUrl,"success":function(data)
{if(data.Result==false)
{if(data.Error=="IndTimeout")
{if(m_IndicationSession!=0)
{GetIndication();}}}
if(data.Service=="GetIndication")
{if(data.Result==true)
{OnIndicationUpdate(data);if(m_IndicationSession!=0)
{GetIndication();}}}},"error":OnObjSrvError});return true;}
else
{OnObjSrvInvalidSettings();}
return false;}
function OnObjSrvRespRcvd(dataObjSrvResp)
{if(m_bEnableCallbackRespRcvd==true)
{m_CallbackRespRcvd(dataObjSrvResp);}}
function OnIndicationUpdate(dataIndUpdate)
{if(m_bEnableCallbackIndicationUpdate==true)
{m_CallbackIndicationUpdate(dataIndUpdate);}}
function OnObjSrvInvalidSettings()
{if(m_bEnableCallbackInvalidSettings==true)
{m_CallbackInvalidSettings();}}
function OnObjSrvError()
{if(m_bEnableCallbackTransmitError==true)
{m_CallbackTransmitError();}}}
