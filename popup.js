/* depending on popup.html's checkbox, http request in background
in order to update the page with the latest image and links */

let readBtn = document.getElementById('readBtn');
let downloadBtn = document.getElementById('downloadBtn');
let readCheck = document.getElementById('readCheck');
// let coverImg = document.getElementById('latestCover'); website doesn't allow img scraping
let titlePara = document.getElementById('title');
let datePara = document.getElementById('date');


//update checkbox with storage
chrome.storage.local.get('boxStatus', function(result){
  if (typeof result.boxStatus != 'undefined') {
    console.log('checkbox status loaded to ' + result.boxStatus);
    readCheck.checked = result.boxStatus;
  } else {
    console.log('checkbox status not previously stored');
  }
});

//save the checkbox status if changed
readCheck.addEventListener('change', function(){
  console.log('checkbox clicked');
  chrome.storage.local.set({boxStatus: readCheck.checked}, function(){
    console.log('checkbox status saved to ' + readCheck.checked);
  })
});

//message for background http request
chrome.runtime.sendMessage({boxChecked: readCheck.checked}, function(response){
  console.log(JSON.stringify(response));

  //fill information paragraphs
  titlePara.innerText = response.title;
  datePara.innerText = response.date;

  //add buttons click handlers
  readBtn.addEventListener('click', read);
  downloadBtn.addEventListener('click', download);

  function read() {
    console.log('Reading in browser');
    chrome.tabs.create({url: response.readLink});
  }

  function download() {
    console.log('Downloading chapter');
    chrome.tabs.create({url: response.downloadLink});
  }

  // website detects webscraping and won't allow image retrieval
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
