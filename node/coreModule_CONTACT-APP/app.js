//Mengambil Argunemn dari Comand Line

const { demandCommand } = require("yargs");
const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
    command : 'add',
    describe : 'Menambahkan Contact baru ...',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type : 'string',
        },
        email : {
            describe : 'Email',
            demandOption : false,
            type : 'string',
        },
        phoneNumb : {
            describe : 'Nomor Smartphone',
            demandOption : true,
            type : 'string', 
        },
    },
    handler (argv) {
        contacts.saveContact(
            argv.nama,
            argv.email,
            argv.phoneNumb,
        );
    }
})
    .demandCommand();

            // MENAMPILKAN DAFTAR NAMA & NO HP CONTACT
yargs.command({
    command : 'list',
    describe : 'Menampilkan List Nama dan No HP Contact',
    handler () {
        contacts.listContact();
    }
});

            // MENAMPILKAN DETAIL SEBUAH CONTACT
yargs.command({
    command : 'detail',
    describe : 'Menampilkan Detail sebuah Contact berdasarkan Nama ',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type : 'string',
        },
    },
    handler (argv) {
        contacts.detailContact(argv.nama);
    }
});

            // MENGHAPUS SEBUAH DATA DI CONTACT BERDASARKAN NAMA
yargs.command({
    command : 'delete',
    describe : 'Menghapus sebuah Contact berdasarkan Nama ',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type : 'string',
        },
    },
    handler (argv) {
        contacts.deleteContact(argv.nama);
    }
});


yargs.parse();




// const {inputQuestions, saveContact} = require('./contacts');

// const main = async () => {
//     const nama = await inputQuestions('Please insert your name ... ');
//     const email = await inputQuestions('Please insert your email ...');
//     const phoneNumb = await inputQuestions('Please insert your phone number  ...');

//     saveContact (nama, email, phoneNumb);
// };

// main();