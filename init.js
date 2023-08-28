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
// uoi
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





function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    const id = `${timestamp}-${random}`;
    return id.slice(0, 8); // Slice and return the first 9 characters of the ID
}

function closeWindow() {
    setTimeout(() => {
        window.close()
    }, 3000);
}
