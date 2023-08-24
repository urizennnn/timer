'use strict';

const timers = document.querySelector('.timers');
const timeList = document.querySelector('.time-list ul')

// Define a function to retrieve and log data from storage
// function getAndInsertStorageData() {
//     chrome.storage.sync.get(null, function (result) {
//         if (!chrome.runtime.lastError) {
//             console.log('Data retrieved from sync storage:', result);

//             // Process or display the data here as needed
//             
//         } else {
//             console.error(chrome.runtime.lastError);
//         }
//     });
// }

// Call the function to retrieve and insert data


    chrome.storage.local.get(keysToRetrieve,  (result)=> {
        const{purpose,timeLeft,amount_time}= result
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
             // Assuming you want to use the entire result
            const html =  // Convert to JSON string for display
            timeList.insertAdjacentHTML('afterbegin', html);
        }
    });



