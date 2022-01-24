function printName(name) {
    return `Hi, My name is ${name}`;
}

const PI = 3.14;

const students = {
    name: 'Devangga',
    age: 19,
    printData () {
        return`Hello ! My name is ${this.name} and i'm ${this.age} years old`;
    },
};

class person {
    constructor () {
        console.log('Object person has been made!!');
    }
}

// module.exports.printName = printName;
// module.exports.PI = PI;
// module.exports.students = students;
// module.exports.person = person;

module.exports = {
    printName : printName,
    PI : PI,
    students : students,
    person : person,
}