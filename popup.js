//'View' and 'Download' buttons functionality

let readBtn = document.getElementById('readBtn');
let downloadBtn = document.getElementById('downloadBtn');
let readCheck = document.getElementById('readCheck');


readBtn.addEventListener('click', read);
downloadBtn.addEventListener('click', download);

function read() {
  console.log('Reading in browser');
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = redirectTab;
  httpRequest.open('GET', 'https://jaiminisbox.com/reader/series/one-piece-2/');
  httpRequest.send();

  function redirectTab() {

  }
}

function download() {
  console.log('Downloading chapter');
}
