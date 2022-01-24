// Core Module
                            // file System
const fs = require('fs');

                            // CHALK MODULE
const chalk = require('chalk');

                            // VALIDATOR MODULE
const validator = require('validator');


// Membuat Folder bila saat di cek folder ersebut tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file Contact.json jika belum ada
const filePath = './data/contacts.json';
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

const loadContact = () => {
    const buffer = fs.readFileSync ('data/contacts.json', 'utf8');
    const contacts = JSON.parse(buffer); 
    return contacts;
};

const saveContact = (nama, email, phoneNumb) => {
    const contact =  {
        nama : nama,
        email : email,
        phoneNumb : phoneNumb,
    }
    // const buffer = fs.readFileSync ('data/contacts.json', 'utf8');
    // const contacts = JSON.parse(buffer); 

    const contacts = loadContact();

    // CEK DUALISME DATA
    const duplication = contacts.find((contact) => contact.nama === nama);
    if (duplication) {
        console.log(
            chalk.red.inverse.bold('Nama sudah terdaftar ! Silahkan gunakan nama lain !')
        );
        return false;
    }

    // CEK VALIDATOR EMAIL
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold('Email yang ada masukan tidak VALID')
            );
            return false;
        }
    }

    // CEK VALIDATOR NOMOR HP
    if (!validator.isMobilePhone(phoneNumb, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold('Nomor handphone yang ada masukan tidak VALID')
        );
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

    console.log(chalk.gray.inverse.bold('Terima Kasih sudah memasukan data :)'));
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Contact : '));

    contacts.forEach((contact, i) => {
        console.log(`${i +1}. ${contact.nama}. - ${contact.phoneNumb}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => 
        contact.nama.toLowerCase() === nama.toLowerCase()
    )

    if (!contact) {
        console.log(
            chalk.red.inverse.bold(`${nama} tidak ditemukan ! `)
        );  
        return false;  
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.phoneNumb);
    if (contact.email) {
        console.log(contact.email);
    }
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );
    if (contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(`${nama} tidak ditemukan ! `)
        );  
        return false; 
    };

        fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));

    console.log(chalk.gray.inverse.bold(`Data Contact ${nama} berhasil dihapus ! `));

};

module.exports = {
    saveContact : saveContact,
    listContact : listContact,
    detailContact : detailContact,
    deleteContact : deleteContact,
}