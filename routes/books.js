var express = require('express');
var router = express.Router();
var { body } = require('express-validator')
const {
    bookPage,
    bookAdd,
    bookAddPage,
    bookEdit,
    bookEditPage,
    bookDelete,
    bookDetail
} = require('./controllers')
 
// display books page
router.get('/', bookPage);

//display detail book
router.get('/books/detail/:id', bookDetail);

// display add book page
router.get('/books/add', bookAdd);

// add a new book
router.post('/books/add',bookAddPage);

// // display edit book page
router.get('/books/edit/(:id)', bookEdit);

// // update book data
router.post('/books/edit/:id', bookEditPage);
   
// // delete book
router.get('/books/delete/:id', bookDelete);

module.exports = router;