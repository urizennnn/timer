'use strict';

chrome.storage.local.get(["purpose", "time", "timeLeft", "id", "amount_time", "fulfilled"], (result) => {
    const { id, amount_time, time, purpose, timeLeft, fulfilled } = result;

    console.log(id, amount_time, time, purpose, timeLeft, fulfilled);

    // Create a new list item for each timer and populate it with the retrieved data
    const timersList = document.querySelector('.time-list ul');

    const timerItem = document.createElement('li');
    timerItem.innerHTML = `
        <strong>ID:</strong> ${id}<br>
        <strong>Amount Time:</strong> ${amount_time}<br>
        <strong>Time:</strong> ${time}<br>
        <strong>Purpose:</strong> ${purpose}<br>
        <strong>Time Left:</strong> ${timeLeft}<br>
        <strong>Fulfilled:</strong> ${fulfilled}
    `;

    timersList.appendChild(timerItem);
});
