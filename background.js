chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.boxChecked === true){
    sendResponse({httpRequest: "checking for latest chapter..."});
  } else{
    sendResponse({httpRequest: "box unchecked, no http request"})
  }
});
