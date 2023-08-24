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

function getStorge(keysToRetrieve){
    chrome.storage.local.get(keysToRetrieve,  (result)=> {
       const {keysToRetrieve} = result
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {

         return keysToRetrieve

        }


        
    });
}
const purpose = getStorge(purpose)
console.log(purpose)
