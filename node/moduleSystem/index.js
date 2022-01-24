// const fileSystem = require(`fs`); // MCORE MODULE
// const printName = require(`./main.js`); // LOCL MODULE
// const moment = require(`moment`); // THIRD-PARTY MODULE // NPM

const main = require('./main.js');

console.log (
    main.printName('Devangga'), 
    main.PI, 
    main.students.printData(),
    new main.person(),
    )
