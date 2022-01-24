const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const {body, validationResult, check} = require('express-validator');
const methodOverride = require('method-override')


const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./util/db');
const Contact = require('./model/contact');
const { findOne } = require('./model/contact');

const app = express();
const port = 3000;

//SETUP METHOD OVERRIDE
app.use(methodOverride('_method'))


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

//HALAMAN FORM TAMBAH DATA CONTACT
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title : 'Form Tambah data Contact',
        layout : 'layouts/main-layouts',
    })
});

//PROCESS TAMBAH DATA CONTACT
app.post('/contact', [
    body('nama').custom( async (value) => {
        const duplikat = await Contact.findOne({ nama : value});
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
    } else {
        Contact.insertMany(req.body, (error, result) => {
            //KIRIMKAN FLASH MESSAGE
            req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
            res.redirect('/contact');
        })
    };
});

app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama : req.body.nama}).then((result) => {
        req.flash('msg', 'Data Contact Berhasil dihapus!');
        res.redirect('/contact');
    });
})

//HALAMAN FORM UBAH DATA CONTACT
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama : req.params.nama});

    res.render('edit-contact', {
        title : 'Form Edit data Contact',
        layout : 'layouts/main-layouts',
        contact: contact,
    })
});

//PROCESS EDIT DATA 
app.put('/contact', 
    [
        body('nama').custom(async(value, {req}) => {
            const duplikat = await Contact.findOne({ nama: value});
            if (value !== req.body.oldNama && duplikat) {
                throw new Error ('Nama contact sudah terdaftar !!');
            };
            return true;
        }),
        check('email', 'Email tidak Valid').isEmail(),
        check('nohp', 'No HP tidak Valid').isMobilePhone('id-ID'),
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('edit-contact', {
                title : 'Form Edit data Kontak',
                layout : 'layouts/main-layouts',
                errors : errors.array(),
                contact: req.body,
            });
        } else {
            Contact.updateOne(
                { _id: req.body._id},
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp
                    },
                },
            ).then((result) => {
                // KIRIMKAN FLASH MSG
                req.flash('msg', 'Data Contact Berhasil DiUbah!');
                res.redirect('/contact');
            })
        };
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