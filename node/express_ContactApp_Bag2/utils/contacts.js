// file System
const fs = require('fs');

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

//AMBIL SEMUA DATA KONTAK DI CONTACTS.JSON
const loadContact = () => {
    const buffer = fs.readFileSync ('data/contacts.json', 'utf8');
    const contacts = JSON.parse(buffer); 
    return contacts;
};

//CARI KONTAK BERDASARKAN NAMA
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => 
        contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
};

//METHOD UNTUK MENIMPA FILE CONTACTS.JSON DENGAN DATA BARU
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

//MENAMBAHKAN DATA KONTAK BARU
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

// CEK NAMA YANG DUPLIKAT
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
};


module.exports =  {
    loadContact : loadContact,
    findContact : findContact,
    addContact : addContact,
    cekDuplikat : cekDuplikat,
};