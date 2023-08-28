'use strict';

// LOCAL DATABASE (as an array)
const database = [];

function countdownSec(seconds, data) {
    let timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown complete!');
            storageChange(data)
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
            storageChange(data)
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
            storageChange(data)
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

function setStorage(data) {
    // // Retrieve existing data from chrome.storage.local
    // chrome.storage.local.get(null, function (result) {
    //     if (chrome.runtime.lastError) {
    //         console.error("Error while getting data: " + chrome.runtime.lastError);
    //         return;
    //     }

    //     const existingData = result || {}; // Initialize existingData as an empty object if no data exists

    //     // Merge existing data with new data
    //     const mergedData = { ...existingData, ...data };

    // Store the merged data back in local storage
    chrome.storage.local.set(data, function () {
        if (chrome.runtime.lastError) {
            console.error("Error while setting data: " + chrome.runtime.lastError);
        } else {
            console.log('Data merged and updated successfully.');
        }
        clearDb()
        console.log(data)
    });
};


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

    setStorage(data);

});

function callNotification() {
    console.log('notifications called');
    chrome.notifications.create({
        title: "Timer",
        message: "Your time is up",
        iconUrl: 'icon.jpg',
        type: 'basic'
    });
}

function storageChange(data) {
    data.fulfilled = true
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.fulfilled) {
            const fulfilled = changes.fulfilled.newValue;

            if (fulfilled === true) {
                callNotification(); // Define this function elsewhere in your code
            }
        }
    });
    setStorage(data)
    console.log(database)

}





function clearDb() {
    if (database.length > 0) {
        database.length = 0;
        database.push(data);
    }
}

