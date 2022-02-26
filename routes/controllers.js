var express = require('express');
var dbConn  = require('../lib/db');


exports.bookPage = (req, res, next) => {
    dbConn.query('SELECT * FROM books ORDER BY id desc',function(err,rows)     { 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
            console.log(rows);
        }
    });
}

exports.bookDetail = (req, res, next) => {
    let id = req.params.id;
        dbConn.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
            if(err) throw err
             
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Book not found with id = ' + id)
                res.redirect('/')
            }
            // if book found
            else {
                // render to edit.ejs
                res.render('books/detail', {
                    title: 'Detail book', 
                    id: rows[0].id,
                    name: rows[0].name,
                    author: rows[0].author
                })
            }
        })
}

exports.bookAdd = (req, res, next) => {
    res.render('../views/books/add', {
        name: '',
        author: ''        
    })
}   

exports.bookAddPage = (req, res, next) => {
    const name = req.body.name;
    const author = req.body.author;
    query = `INSERT INTO books(name, author) VALUES ('${name}', '${author}')`
    dbConn.query(query, function (err, result) {
        if (err) throw err;
    // console.log('record inserted');
    req.flash('messages', 'Data added successfully!');
    res.redirect('/')
    });
}

exports.bookEdit = (req, res, next) => {
        let id = req.params.id;
        dbConn.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
            if(err) throw err
             
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Book not found with id = ' + id)
                res.redirect('/books')
            }
            // if book found
            else {
                // render to edit.ejs
                res.render('books/edit', {
                    title: 'Edit Book', 
                    id: rows[0].id,
                    name: rows[0].name,
                    author: rows[0].author
                })
            }
        })
}

exports.bookEditPage = (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('books/edit', {
            id: req.params.id,
            name: name,
            author: author
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            name: name,
            author: author
        }
        // update query
        dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('/', {
                    id: req.params.id,
                    name: form_data.name,
                    author: form_data.author
                })
            } else {
                req.flash('success', `Book ${id} successfully updated`);
                res.redirect('/');
            }
        })
    }
}

exports.bookDelete = (req, res, next) => {
    let id = req.params.id;
     
    dbConn.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/')
        }
    })
}