'use strict'
import { database } from "./background";
const history_list = document.querySelector('.history ul')

console.log(database)

setTimeout(() => {
        console.log(database)
}, 10000);