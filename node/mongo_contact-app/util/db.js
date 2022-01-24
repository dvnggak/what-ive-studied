const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});



// // MENAMBAH SATU DATA
// const contact1 = new contact(
//     {
//         nama : "Syifa",
//         nohp : "081888776655",
//         email : "syifa@gmail.com"
//     }
// );


// // SIMPAN KE COLLECTIONS
// contact1.save().then((contact) => console.log(contact));