'use strict'
// Listen for changes to the 'fulfilled' value in chrome.storage.local

const timeList = document.querySelector('.timer-list')

console.log(chrome.storage.local.get())
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.fulfilled) {
        const fulfilled = changes.fulfilled.newValue;
        if (fulfilled === true) {
           callNotification()
        }
    }
});
