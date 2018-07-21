//if the popup checkbox is checked, http req to the website
//send back the latest chapter url, the download url and the cover img

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('bg script running with checkbox set to ' + request.boxChecked);
  if (request.boxChecked === true) {
    console.log('box checked');
    let latestChapter;
    let latestRead;
    let latestDownload;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = fillPopup;
    xhr.open('GET', 'https://jaiminisbox.com/reader/series/one-piece-2/');
    xhr.responseType = "document";
    xhr.send();

    function fillPopup() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          latestChapter = xhr.response;
          latestDownload = latestChapter.querySelector(".element div a"); //a[href*='read'] not working
          latestRead = latestChapter.querySelector(".element .title a");
          uploadDate = latestChapter.querySelector(".element .meta_r")
          sendResponse({downloadLink: latestDownload.href, readLink: latestRead.href, title: latestRead.innerText, date: uploadDate.innerText});
        }
      }
    }
    return true; //sendResponse has to be asynchronous or variables sent are undefined
  } else {
    console.log('box unchecked');
    sendResponse({downloadLink: 'unchecked checkbox', readLink: 'unchecked checkbox', title: 'unchecked checkbox', date: 'unchecked checkbox'});
  }
});
