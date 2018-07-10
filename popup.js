//'View' and 'Download' buttons functionality

let readBtn = document.getElementById('readBtn');
let downloadBtn = document.getElementById('downloadBtn');

readBtn.addEventListener('click', read);
downloadBtn.addEventListener('click', download);

function read() {
  console.log('Reading in browser');
}

function download() {
  console.log('Downloading chapter');
}
