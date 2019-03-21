var shaarliInstance = "https://example.com/";

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get({
        savedShaarliInstance: "https://example.com/"
    }, function (items) {
        shaarliInstance = items.savedShaarliInstance;
        var myCode = "!function(){var o=location.href,e=document.title||o;window.open(\"" + shaarliInstance + "?post=\"+encodeURIComponent(o)+\"&title=\"+encodeURIComponent(e)+\"&description=\"+encodeURIComponent(document.getSelection())+\"&source=bookmarklet\",\"_blank\",\"menubar=no,height=800,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1\")}();";
        if (shaarliInstance === "https://example.com/" || shaarliInstance === "") {
            myCode = "alert(\"Please setup your Shaarli instance in the options of the extension.\")";
        }
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript(tab.id, { code: myCode }, function (response) { });
        });
    });
});

/*
(function () {
    var url = location.href;
    var title = document.title || url;
    window.open('https://example.com/?post=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&description=' + encodeURIComponent(document.getSelection()) + '&source=bookmarklet', '_blank', 'menubar=no,height=800,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1');
})();
*/
