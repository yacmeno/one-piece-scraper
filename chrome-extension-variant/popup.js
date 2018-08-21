/* depending on popup.html's checkbox, http request in background
in order to update the page with the latest image and links */

let readUrl = document.getElementById('readUrl');
let downloadUrl = document.getElementById('downloadUrl');
let readCheck = document.getElementById('readCheck');
// let coverImg = document.getElementById('latestCover'); website doesn't allow img scraping
let titlePara = document.getElementById('title');
let datePara = document.getElementById('date');


//update links, checkbox and paragraphs with last saved chapter info
chrome.storage.local.get(['boxStatus', 'title', 'date', 'readUrl', 'downloadUrl'], function(result) {
  if (typeof(result.boxStatus) != 'undefined') {
    console.log('checkbox status loaded to ' + result.boxStatus);
    readCheck.checked = result.boxStatus;
  } else {
    console.log('checkbox status not previously stored'); //for first time using the extension
  }
  
  titlePara.innerText = result.title;
  datePara.innerText = result.date;
  readUrl.href = result.readUrl;
  downloadUrl.href = result.downloadUrl;
});

//anchor tags click events
readUrl.addEventListener('click', function() {
  chrome.tabs.create({url: readUrl.href});
});

downloadUrl.addEventListener('click', function() {
  chrome.tabs.create({url: downloadUrl.href});
});

//save the checkbox status if changed, add string on icon when chapter is unread
readCheck.addEventListener('change', function() {
  saveCheck();
  changeBadge();
});

function saveCheck() {
  chrome.storage.local.set({boxStatus: readCheck.checked}, function() {
    console.log('checkbox status saved to ' + readCheck.checked);
  });
}

function changeBadge() {
  if (readCheck.checked === true) {
    chrome.browserAction.setBadgeText({text: ''}); 
  } else if (readCheck.checked === false) {
    chrome.browserAction.setBadgeText({text: '!'});
  }
}

//message for background http request
//Need to delay the messaging to use the checkbox value loaded from storage, otherwise the html default one is used

setTimeout(function(){backgroundMessage();}, 500); //wait for storage to load

function backgroundMessage() {
  chrome.runtime.sendMessage({boxChecked: readCheck.checked}, function(response) {
    console.log(JSON.stringify(response));
  
    //fill information if response was chapter information
    if (response.title !== 'unchecked checkbox') {
      titlePara.innerText = response.title;
      datePara.innerText = response.date;
      readUrl.href = response.readLink;
      downloadUrl.href = response.downloadLink;
      
      chrome.storage.local.set({title: titlePara.innerText, date: datePara.innerText, readUrl: response.readLink, downloadUrl: response.downloadLink}, function() {
        console.log('saved chapter info');
      });
    }
    
    // website doesn't allow image retrieval
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = changeImg;
    // xhr.open('GET', response.readLink);
    // xhr.responseType = "document";
    // xhr.send();
    //
    // function changeImg() {
    //   let latestCover;
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    //     if (xhr.status === 200) {
    //       latestCover = (xhr.response).querySelector("#page .inner .open"); //first page img dom object
    //       coverImg.src = latestCover.src;
    //     }
    //   }
    // }
  });
}

