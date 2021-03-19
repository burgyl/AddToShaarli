const defaultShaarliInstance = "https://example.com/";

function addUrl() {
  chrome.storage.sync.get({
    savedShaarliInstance: defaultShaarliInstance
  }, function (items) {
    let shaarliInstance = items.savedShaarliInstance;
    let myCode = "!function(){var o=location.href,e=document.title||o;const popup=window.open('" +
      shaarliInstance +
      "?post='+encodeURIComponent(o)+'&title='+encodeURIComponent(e)+'&description='+encodeURIComponent(document.getSelection())+'&source=bookmarklet','_blank','menubar=no,height=800,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1')}();";
    executeScript(shaarliInstance, myCode);
  });
}

function addNote() {
  chrome.storage.sync.get({
    savedShaarliInstance: defaultShaarliInstance
  }, function (items) {
    let shaarliInstance = items.savedShaarliInstance;
    let myCode = "!function(){var e=document.title;const popup=window.open('" +
      shaarliInstance +
      "?post='+'&description='+encodeURIComponent(document.getSelection()),'_blank','menubar=no,height=800,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1')}();";
    executeScript(shaarliInstance, myCode);
  });
}

function executeScript(shaarliInstance, code) {
  if (shaarliInstance === defaultShaarliInstance || shaarliInstance === "")
    code = "alert('Please setup your Shaarli instance in the options of the extension.')";
  chrome.tabs.query({
    active: true
  }, function () {
    chrome.tabs.executeScript({
      code: code
    });
  });
}

chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case "add-url":
      addUrl();
      break;
    case "add-note":
      addNote();
      break;
  }
});

chrome.browserAction.onClicked.addListener(function () {
  addUrl();
});