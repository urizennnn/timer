'use strict';
let Purpose
// Check if the code has already been executed
// if (!localStorage.getItem('codeExecuted')) {
//     // Set a flag in local storage to indicate that the code has been executed
//     localStorage.setItem('codeExecuted', 'true');

// Wait for the DOM to be loaded before executing the script
// document.addEventListener('DOMContentLoaded', () => {
const timeList = document.querySelector('.time-list h3'); // Make sure this selector matches your HTML structure

// Function to update the countdown display
function updateCountdownDisplay(timeLeft) {
    if (timeLeft > 0) {
        const hoursRemaining = Math.floor(timeLeft / 3600);
        const minutesRemaining = Math.floor((timeLeft % 3600) / 60);
        const secondsRemaining = timeLeft % 60;

        let displayText = '';

        if (timeLeft === 0) displayText += `<h3>0 Seconds remaining</h3>`

        if (hoursRemaining > 0) {
            displayText += `<span>${Purpose}</span>${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''} `;
        }

        if (minutesRemaining > 0) {
            displayText += `<span>${Purpose}</span>${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}`;
        }

        if (secondsRemaining > 0) {
            displayText += `<span>${Purpose}</span> ${secondsRemaining} second${secondsRemaining > 1 ? 's' : ''}`;
        }

        timeList.innerHTML = `<h3>${displayText} left</h3>`;
    } else {
        timeList.innerHTML = '<h3>Countdown complete!</h3>';
        clearText();
    }

}

// Check if there is data in chrome.storage.local and update the text accordingly
chrome.storage.local.get(['id', 'amount_time', 'time', 'purpose', 'timeLeft', 'fulfilled', 'showTimer', 'notification'], result => {
    let { purpose, time, amount_time, timeLeft, showTimer, notification } = result;

    switch (showTimer) {
        case 'yes':
            if (amount_time) {
                switch (amount_time) {
                    case 'seconds':
                        countdownSec(time);
                        break;
                    case 'hours':
                        countdownHours(time);
                        break;
                    case 'minutes':
                        countdownMin(time);
                        break;
                    default:
                        console.error('Unexpected value for data.amount_time:', amount_time);
                        break;
                }
            }
            break;
        case 'no':
            timeList.innerHTML = `<h3>Timer is running in the background</h3>`;
            break;
        default:
            timeList.innerHTML = `<h3>You do not have any running timers</h3>`;
            break;
    }
    Purpose = purpose
    if (amount_time) {
        switch (amount_time) {
            case 'seconds':
                countdownSec(time);
                break;
            case 'hours':
                countdownHours(time);
                break;
            case 'minutes':
                countdownMin(time);
                break;
            default:
                // Handle unexpected values for data.amount_time
                console.error('Unexpected value for data.amount_time:', amount_time);
                break;
        }
    }

    // Function to clear the text after a delay
    function clearText() {
        setTimeout(() => {
            timeList.innerHTML = '<h3>You do not have any running timers</h3>';
        }, 3000); // This clears the text after 3 seconds, adjust the delay as needed
    }

    function countdownSec(seconds) {
        let timer = setInterval(() => {
            if (seconds <= 0) {
                clearInterval(timer);
                console.log('Countdown complete!');
                chrome.storage.local.clear()
            } else {
                timeLeft = seconds; // Update timeLeft with the remaining time in seconds
                updateCountdownDisplay(timeLeft); // Update the countdown display
                seconds--;
            }
        }, 1000); // Update every 1000 milliseconds (1 second)
    }

    function countdownMin(minutes) {
        let seconds = minutes * 60; // Convert minutes to seconds

        let timer = setInterval(() => {
            if (seconds <= 0) {
                clearInterval(timer);
                console.log('Countdown complete!');
                chrome.storage.local.clear()
            } else {
                const minutesRemaining = Math.floor(seconds / 60);
                const secondsRemaining = seconds % 60;

                // timeLeft.textContent = `Minutes: ${minutesRemaining}, Seconds: ${secondsRemaining}`;
                timeLeft = seconds; // Update timeLeft with the remaining time in seconds
                updateCountdownDisplay(timeLeft); // Update the countdown display
                seconds--;
            }
        }, 1000); // Update every 1000 milliseconds (1 second)
    }

    function countdownHours(hours) {
        let seconds = hours * 3600; // Convert hours to seconds

        let timer = setInterval(() => {
            if (seconds <= 0) {
                clearInterval(timer);
                console.log('Countdown complete!');
                chrome.storage.local.clear()
            } else {
                const hoursRemaining = Math.floor(seconds / 3600);
                const minutesRemaining = Math.floor((seconds % 3600) / 60);
                const secondsRemaining = seconds % 60;

                // timeLeft.textContent= `Hours: ${hoursRemaining}, Minutes: ${minutesRemaining}, Seconds: ${secondsRemaining}`;
                timeLeft = seconds; // Update timeLeft with the remaining time in seconds
                updateCountdownDisplay(timeLeft); // Update the countdown display
                seconds--;
            }
        }, 1000); // Update every 1000 milliseconds (1 second)
    }
});
    // });

