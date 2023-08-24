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
function setStorage(data) {
    chrome.storage.sync.get(data, function (result) {
        if (chrome.runtime.lastError) {
            console.error("Error while getting data: " + chrome.runtime.lastError);
            return;
        }

        const existingData = result; // Retrieve existing data

        // Merge existing data with new data
        const mergedData = { ...existingData, ...data };

        // Store the merged data back in local storage
        chrome.storage.local.set(mergedData, function () {
            if (chrome.runtime.lastError) {
                console.error("Error while setting data: " + chrome.runtime.lastError);
            } else {
                console.log('Data merged and updated successfully.');
            }
        });
    });
}


// Example usage:




chrome.runtime.onMessage.addListener(data => {
    const {id, amount_time,time,purpose,timeLeft,fulfilled} = data
    switch (amount_time) {
        case 'seconds':
            countdownSec(time);
            console.log("seconds")
           
            break;
        case 'hours':
            countdownHours(time);
            console.log("hours")
          
            break;
        case 'minutes':
            countdownMin(time);
            console.log("minutes")
                 
            break;
        default:
            // Handle unexpected values for data.amount_time
            console.error('Unexpected value for data.amount_time:', amount_time);
            break;
    }
})