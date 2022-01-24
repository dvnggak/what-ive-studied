const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/contacts');
const {body, validationResult, check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// EJS
app.set('view engine', 'ejs');
//Third Party Middleware
app.use(expressLayouts);

//Built-In Middleware Express Static
app.use(express.static('public'));

app.use(express.urlencoded({extended : true}));

//KONFIGURASI FLASH
app.use(cookieParser('secret'));
app.use(
    session({
        cookie : {maxAge: 6000},
        secret : 'secret',
        resave : true,
        saveUninitialized : true,
    })
);
app.use(flash());

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama : ' Devangga Kertawijaya',
            email : 'devangga@gmail.com',
        },
        {
            nama : ' Lasyifa Regina Kertawijaya',
            email : 'syifa@gmail.com',
        },
        {
            nama : ' Msy Atika Sukmawati',
            email : 'eka@gmail.com',
        },
    ];
    res.render('index', {
        nama : 'Devangga Kertawijaya',
        title : 'Halaman Home',
        mahasiswa : mahasiswa,
        layout : 'layouts/main-layouts',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout : 'layouts/main-layouts',
        title : 'Halaman About',
    });

});

app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact', {
        layout : 'layouts/main-layouts',
        title : 'Halaman Contact',
        contacts : contacts,
        msg : req.flash('msg'),
    });
});

//HALAMAN FORM TAMBAH DATA CONTACT
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title : 'Form Tambah data Contact',
        layout : 'layouts/main-layouts',
    })
});

//PROCESS DATA CONTACT
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error ('Nama contact sudah terdaftar !!');
        };
        return true;
    }),
    check('email', 'Email tidak Valid').isEmail(),
    check('nohp', 'No HP tidak Valid').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            title : 'Form Tambah data Kontak',
            layout : 'layouts/main-layouts',
            errors : errors.array(),
        });
        // return res.status(400).json({errors: errors.array()});
    } else {
        addContact(req.body);
        // KIRIMKAN FLASH MSG
        req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
        res.redirect('/contact');
    };
});

//HALAMAN DETAIL CONTACT
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        layout : 'layouts/main-layouts',
        title : 'Detail Contact',
        contact : contact,
    });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1> 404 </h1>');
});

app.listen(port, () => {
    console.log(`Example App listening at https://localhost:${port}`);
});``