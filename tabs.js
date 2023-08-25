'use strict';
closeWindow()
const timeList = document.querySelector('.time-list h3'); // Make sure this selector matches your HTML structure

// Check if there is data in chrome.storage.local and update the text accordingly
chrome.storage.local.get(['id', 'amount_time', 'time', 'purpose', 'timeLeft', 'fulfilled'], result => {
    const {fulfilled} = result
   if(fulfilled===false){
       timeList.innerHTML = '<h3>Timer is Running</h3>';
   }
});

// Listen for changes to the 'fulfilled' value in chrome.storage.local

// Function to clear the text after a delay
function clearText() {
    setTimeout(() => {
        timeList.innerHTML = '<h3>You do not have any running timers</h3>';
    }, 3000); // This clears the text after 3 seconds, adjust the delay as needed
}
function closeWindow(){
    setTimeout(() => {
        window.close()
    }, 3000);
}