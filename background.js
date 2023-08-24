chrome.runtime.onMessage.addListener(data => {
    switch (data.amount_time) {
        case 'seconds':
            countdownSec(data.timeValue);
            break;
        case 'hours':
            countdownHours(data.timeValue);
            break;
        case 'minutes':
            countdownMin(data.timeValue);
            break;
        default:
            // Handle unexpected values for data.amount_time
            console.error('Unexpected value for data.amount_time:', data.amount_time);
            break;
    }
});
console.log(123)