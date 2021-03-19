function save_options() {
    const shaarliInstance = document.getElementById('shaarliInstance').value;
    chrome.storage.sync.set({
        savedShaarliInstance: shaarliInstance
    }, function () {
        window.close();
    });
}

function restore_options() {
    chrome.storage.sync.get({
        savedShaarliInstance: "https://example.com/"
    }, function (items) {
        document.getElementById('shaarliInstance').value = items.savedShaarliInstance;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);