// Listen for extension-icon click and make http request
// only initiate http request if chapter is already read

//listen to messages from popup.js for checkedbox
//http request for latest chapter and change popup.html content

chrome.browserAction.onClicked.addListener(function(){
  let readCheck = document.getElementById('readCheck');
  if (readCheck.checked){
    console.log('box checked');
  } else {
    console.log('box unchecked');
  }
})
