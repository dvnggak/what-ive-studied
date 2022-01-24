const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// EJS
app.set('view engine', 'ejs');
//Third Party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

//Built-In Middleware Express Static
app.use(express.static('public'));

// Aplication level Middleware
app.use((req, res, next) => {
    console.log('Time :', Date.now());
    next();
});

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
    res.render('contact', {
        layout : 'layouts/main-layouts',
        title : 'Halaman Contact',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`product ID :  ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1> 404 </h1>');
});

app.listen(port, () => {
    console.log(`Example App listening at https://localhost:${port}`);
});