'use strict'
function countdownSec(seconds) {
    let timer = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
        } else {
            console.log(seconds);
            seconds--;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}
function countdownMin(minutes) {
    let seconds = minutes * 60; // Convert minutes to seconds

    let timer = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
        } else {
            const minutesRemaining = Math.floor(seconds / 60);
            const secondsRemaining = seconds % 60;

            console.log(`Minutes: ${minutesRemaining}, Seconds: ${secondsRemaining}`);
            seconds--;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}
function countdownHours(hours) {
    let seconds = hours * 3600; // Convert hours to seconds

    let timer = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
        } else {
            const hoursRemaining = Math.floor(seconds / 3600);
            const minutesRemaining = Math.floor((seconds % 3600) / 60);
            const secondsRemaining = seconds % 60;

            console.log(`Hours: ${hoursRemaining}, Minutes: ${minutesRemaining}, Seconds: ${secondsRemaining}`);
            seconds--;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}


// function setStorage(data) {
//     chrome.storage.local.get(data, function (result) {
//         if (!chrome.runtime.lastError) {
//             const existingData = result; // Retrieve existing data

//             // Merge existing data with new data
//             const mergedData = { ...existingData, ...data };

//             // Store the merged data back in local storage
//             chrome.storage.local.set(mergedData, function () {
//                 if (chrome.runtime.lastError) {
//                     console.error(chrome.runtime.lastError);
//                 } else {
//                     console.log('Data merged and updated successfully.');
//                 }
//             });
//         }
//     });
// }


function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    const id = `${timestamp}-${random}`;
    return id.slice(0, 8); // Slice and return the first 9 characters of the ID
}

function getStorage() {
    chrome.storage.sync.get(data, function (result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log('Retrieved data from sync storage:', result);
        }
    });
}