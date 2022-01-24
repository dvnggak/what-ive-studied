const validator = require('validator');
const chalk = require('chalk');

// console.log (validator.isEmail('devanggaKertawijaya@gmail.com'));
// console.log (validator.isMobilePhone('0812345678', 'id-ID'));
// console.log (validator.isNumeric('0812345678'));

// console.log(chalk.italic.bgBlue.black('Hello World'));
const name = 'Devangga Kertawijaya';
const message = chalk`lorem ipsum dolor {bgRed.black.bold sit amet} consectur dipiscising elit. {bgRed.black My name is ${name}}`;
console.log(message);