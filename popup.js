//'View' and 'Download' buttons functionality

let readBtn = document.getElementById('readBtn');
let downloadBtn = document.getElementById('downloadBtn');

// chrome.runtime.sendMessage(readCheck.checked, function(response){
//
// });
var readCheck = document.getElementById('readCheck');
readCheck.checked;
function saveCheck(){
  // chrome.storage.sync.set({'checkbox': readCheck.checked}, function(){
  //   message('Checkbox setting saved')
  // });
}
saveCheck();

chrome.storage.onChanged.addListener(function(changes, namespace){
  for(key in changes){
    var storageChange = changes[key];
    console.log('storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new valus is "%s".',
               key,
               namespace,
               storageChange.oldValue,
               storageChange.newValue);
  }
});

readBtn.addEventListener('click', read);
downloadBtn.addEventListener('click', download);

function read() {
  console.log('Reading in browser');
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = redirectTab;
  httpRequest.open('GET', 'https://jaiminisbox.com/reader/series/one-piece-2/');
  httpRequest.send();

  function redirectTab() {
    console.log('redirect tab running');
  }
}

function download() {
  console.log('Downloading chapter');
}
