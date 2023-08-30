'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Import the generateUniqueId function or define it if it's a custom function
    const newid = generateUniqueId(); // Make sure this function is defined and returns a unique ID
    const details = document.querySelector('.details');
    const num = document.querySelector('.num');
    const takeABreak = document.querySelector('.break');
    const time = document.querySelector('.time');
    const h3 = document.querySelector('h3');
    const submit = document.querySelector('.submit');
    const purposeInput = document.querySelector('.purpose'); // Renamed to avoid naming conflict
    const measurement = document.querySelector('.measurement');
    const timer = document.querySelector('.timer');
    const settings = document.querySelector('.notification-settings')
    const notificationType = document.querySelector('#notification-type')
   

    if (takeABreak) {
        takeABreak.addEventListener('click', () => {
            submit.classList.remove('hidden')
            takeABreak.classList.add('hidden');
            h3.textContent = 'Finally';
            details.classList.remove('hidden');
        });
    }

    if (details) {
        details.addEventListener('change', () => {
            num.classList.remove('hidden');
        });
    }

    if (num) {
        num.addEventListener('change', () => {
            time.classList.remove('hidden');
        });
    }
    if(time){
        time.addEventListener('change',()=>{
            settings.classList.remove('hidden')
        })
    }


    if (submit) {
        submit.addEventListener('click', () => {
            const timeValue = timer.value;
            const detailsValue = measurement.value;
            const purposeValue = purposeInput.value; // Renamed to avoid naming conflict
          
            const notificationValue = notificationType.value
            // if (notificationValue) console.log(notificationValue)
            
            // Create an object with the correct syntax
            const data = {
                id: newid,
                amount_time: detailsValue,
                purpose: purposeValue,
                time: timeValue,
                timeLeft: undefined, 
                fulfilled: false,
            
                notification:notificationValue
            };
            // kol
            chrome.runtime.sendMessage(data);
            closeWindow()
            // Redirect the user to a new URL
            redirect();
    

            function redirect() {
                window.location.href = '/tabs.html';
            }
            // You might want to save the updated array back to a database or perform other actions here
        });
    }
});