'use strict'
let newData;
function countdownSec(seconds, data) {
    let timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
            // Optionally, update data.fulfilled to true or perform other actions here
            data.fulfilled = true;
            newData = data
            chrome.storage.local.set(newData)
            chrome.storage.local.get(['id', 'amount_time', 'time', 'purpose', 'timeLeft', 'fulfilled'], (result) => {
                const { id, amount_time, time, purpose, timeLeft, fulfilled } = result
                console.log(id, amount_time, time, purpose, timeLeft, fulfilled)
            })
        } else {
            data.timeLeft = seconds; // Update timeLeft with the remaining time in seconds
            seconds--;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}

function countdownMin(minutes, data) {
    let seconds = minutes * 60; // Convert minutes to seconds

    let timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
            data.fulfilled = true;
            newData = data
            chrome.storage.local.set(newData)
            chrome.storage.local.get(['id', 'amount_time', 'time', 'purpose', 'timeLeft', 'fulfilled'], (result) => {
                const { id, amount_time, time, purpose, timeLeft, fulfilled } = result
                console.log(id, amount_time, time, purpose, timeLeft, fulfilled)
            })

        } else {
            const minutesRemaining = Math.floor(seconds / 60);
            const secondsRemaining = seconds % 60;

            console.log(`Minutes: ${minutesRemaining}, Seconds: ${secondsRemaining}`);
            data.timeLeft = seconds; // Update timeLeft with the remaining time in seconds
            seconds--;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}

function countdownHours(hours, data) {
    let seconds = hours * 3600; // Convert hours to seconds

    let timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
            data.fulfilled = true;
            newData = data
            chrome.storage.local.set(newData)
            chrome.storage.local.get(['id', 'amount_time', 'time', 'purpose', 'timeLeft', 'fulfilled'], (result) => {
                const { id, amount_time, time, purpose, timeLeft, fulfilled } = result
                console.log(id, amount_time, time, purpose, timeLeft, fulfilled)
            })

        } else {
            const hoursRemaining = Math.floor(seconds / 3600);
            const minutesRemaining = Math.floor((seconds % 3600) / 60);
            const secondsRemaining = seconds % 60;

            console.log(`Hours: ${hoursRemaining}, Minutes: ${minutesRemaining}, Seconds: ${secondsRemaining}`);
            data.timeLeft = seconds; // Update timeLeft with the remaining time in seconds
            seconds--;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}

// function setStorage(data) {
//     chrome.storage.sync.get(data, function (result) {
//         if (chrome.runtime.lastError) {
//             console.error("Error while getting data: " + chrome.runtime.lastError);
//             return;
//         }

//         const existingData = result; // Retrieve existing data

//         // Merge existing data with new data
//         const mergedData = { ...existingData, ...data };

//         // Store the merged data back in local storage
//         chrome.storage.local.set(mergedData, function () {
//             if (chrome.runtime.lastError) {
//                 console.error("Error while setting data: " + chrome.runtime.lastError);
//             } else {
//                 console.log('Data merged and updated successfully.');
//             }
//         });
//     });
// }


// Example usage:




chrome.runtime.onMessage.addListener(data => {
    const { id, amount_time, time, purpose, timeLeft, fulfilled = false } = data;

    // Initialize timeLeft based on the selected time unit
    switch (amount_time) {
        case 'seconds':
            data.timeLeft = time; // For seconds, timeLeft is the same as the input time
            countdownSec(time, data); // Start the countdown with the initial time
            break;
        case 'hours':
            data.timeLeft = time * 3600; // Convert hours to seconds
            countdownHours(time, data); // Start the countdown with the initial time
            break;
        case 'minutes':
            data.timeLeft = time * 60; // Convert minutes to seconds
            countdownMin(time, data); // Start the countdown with the initial time
            break;
        default:
            // Handle unexpected values for data.amount_time
            console.error('Unexpected value for data.amount_time:', amount_time);
            break;
    }

    chrome.storage.local.set(data)
    chrome.storage.local.get(['fulfilled'], (result) => {
        const { fulfilled } = result
        console.log(`result is ${fulfilled}`);
    })

});
function callNotification() {
    console.log('notifications called')
    chrome.notifications.create({
        title: "Timer",
        message: "Your time is up",
        iconUrl: 'icon.jpg',
        type: 'basic'
    })
}
