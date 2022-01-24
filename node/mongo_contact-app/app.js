const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./util/db');
const Contact = require('./model/contact');
const { findOne } = require('./model/contact');

const app = express();
const port = 3000;

                // SETUP EJS

app.set('view engine', 'ejs');
app.use(expressLayouts);
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


// HALAMAN HOME
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

//HALAMAN ABOUT
app.get('/about', (req, res) => {
    res.render('about', {
        layout : 'layouts/main-layouts',
        title : 'Halaman About',
    });
});

//HALAMAN CONTACT
app.get('/contact', async (req, res) => {

    const contacts = await Contact.find();

    res.render('contact', {
        layout : 'layouts/main-layouts',
        title : 'Halaman Contact',
        contacts : contacts,
        msg : req.flash('msg'),
    });
});

//HALAMAN DETAIL CONTACT
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});

    res.render('detail', {
        layout : 'layouts/main-layouts',
        title : 'Detail Contact',
        contact : contact,
    });
});

app.listen(port, () => {
    console.log(`Mongo COntact App | Listening at http://localhost:${port}`)
})