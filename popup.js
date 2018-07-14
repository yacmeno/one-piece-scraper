// depending on popup.html's checkbox, http request in background
// in order to update the page with the latest image and links

let readBtn = document.getElementById('readBtn');
let downloadBtn = document.getElementById('downloadBtn');
let readCheck = document.getElementById('readCheck');

//update checkbox according to storage
chrome.storage.sync.get('boxStatus', function(result){
  console.log(result.key);
  if (result.key === true) {
    readCheck.checked = result.key;
  } else if (result.key === false) {
    readCheck.checked = result.key;
  } else {
    console.log('no saved checkbox status');
  }
});

//save the checkbox status
readCheck.addEventListener('change', function(){
  console.log('checkbox clicked');
  chrome.storage.sync.set({boxStatus: readCheck.checked}, function(){
    console.log('checkbox status saved to ' + readCheck.checked);
  })
});

//deal with http request in background
chrome.runtime.sendMessage({boxChecked: readCheck.checked}, function(response){
  console.log(response.httpRequest);
});

//button redirect links are set by the background script
readBtn.addEventListener('click', read);
downloadBtn.addEventListener('click', download);

function read() {
  console.log('Reading in browser');
}

function download() {
  console.log('Downloading chapter');
}
