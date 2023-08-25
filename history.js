'use strict'
const history_list = document.querySelector('.history ul')
console.log("WOrking")

chrome.storage.local.get(["purpose","time"] ,(result)=>{
        const{purpose,time} = result
        console.log(purpose,time)
})