chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({file: "jquery.js"}, function(result) {
      chrome.tabs.executeScript({file: "test.js"});
  });
});
