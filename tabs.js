'use strict';

const timers = document.querySelector('.timers');

// Define a function to retrieve and log data from storage
function getAndInsertStorageData() {
    chrome.storage.sync.get(null, function (result) {
        if (!chrome.runtime.lastError) {
            console.log('Data retrieved from sync storage:', result);

            // Process or display the data here as needed
            const a = result; // Assuming you want to use the entire result
            const html = `<p>${JSON.stringify(a)}</p>`; // Convert to JSON string for display
            timers.insertAdjacentHTML('afterbegin', html);
        } else {
            console.error(chrome.runtime.lastError);
        }
    });
}

// Call the function to retrieve and insert data
getAndInsertStorageData();
