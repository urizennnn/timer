'use strict';

// Import the uuidv4 function or define it if it's a custom function




const newid=generateUniqueId()
const details = document.querySelector('.details');
const num = document.querySelector('.num');
const takeABreak = document.querySelector('.break');
const time = document.querySelector('.time');
const h3 = document.querySelector('h3');
const submit = document.querySelector('.submit');
const main = document.querySelector('.main');
const detailsNum = document.querySelector('.detailsNum');
const timer = document.querySelector('.timer');

takeABreak.addEventListener('click', () => {
    takeABreak.classList.add('hidden');
    h3.textContent = 'Finally';
    details.classList.remove('hidden');
});

details.addEventListener('keydown', () => {
    num.classList.remove('hidden');
});

num.addEventListener('keydown', () => {
    time.classList.remove('hidden');
});

submit.addEventListener('click', () => {
    const timeValue = timer.value;
    const detailsValue = detailsNum.value;
    const mainValue = main.value;

    // Create an object with the correct syntax
    const data = {
        id: newid,
        purpose: mainValue,
        time: timeValue,
        timeLeft: 'Specify a value here', // You should specify a value
        fulfilled: false
    };
        setStorage(data)
    
    
    // Redirect the user to a new URL
    window.location.href = '/tabs.html';


    // You might want to save the updated array back to a database or perform other actions here
});
