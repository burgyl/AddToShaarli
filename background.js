var shaarliInstance = "https://example.com/";

function addUrl(tab)
{
    chrome.storage.sync.get({ savedShaarliInstance: "https://example.com/"}, function (items) 
{
        shaarliInstance = items.savedShaarliInstance;
    const myCode = "!function(){var o=location.href,e=document.title||o;const popup=window.open(\"" + shaarliInstance + "?post=\"+encodeURIComponent(o)+\"&title=\"+encodeURIComponent(e)+\"&description=\"+encodeURIComponent(document.getSelection())+\"&source=bookmarklet\",\"_blank\",\"menubar=no,height=800,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1\")}();";
    chrome.tabs.query({
      active: true
    }, function(tab) {
      chrome.tabs.executeScript({
        code: myCode
      });
    });
  });
}
function addNote()
{
    chrome.storage.sync.get({
        savedShaarliInstance: "https://example.com/"
    }, function (items) {
       shaarliInstance = items.savedShaarliInstance;
    const mCode = "!function(){var o=location.href,e=document.title||o;const popup=window.open(\"" + shaarliInstance + "?post=\"+\"&description=\"+encodeURIComponent(document.getSelection()),\"_blank\",\"menubar=no,height=800,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1\")}();";
    chrome.tabs.query({
      active: true
    }, function(tab) {
      chrome.tabs.executeScript({
        code: mCode
      });
    });
  });
}
chrome.commands.onCommand.addListener(function(command, tab) {
	if (command == "add-url") {
		addUrl(tab);
		}
		
	if (command == "add-note") {
		addNote();
		}			
      });
