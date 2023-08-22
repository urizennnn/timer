'use strict';

const timers = document.querySelector('.timers');

// Define a function to retrieve and log data from storage
function getAndLogStorageData() {
    chrome.storage.sync.get(null, function (result) {
        if (!chrome.runtime.lastError) {
            console.log('Data retrieved from sync storage:', result);
            // You can process or display the data here as needed
        } else {
            console.error(chrome.runtime.lastError);
        }
    });
}

// Call the function to retrieve and log data
getAndLogStorageData();
