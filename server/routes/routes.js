const express = require('express');
const route = express.Router()

//main page
route.get('/', (req,res) =>{
    res.render('index');
})

//new user 
route.get('/add-user', (req,res) =>{
    res.render('add_user');
})

//update user 
route.get('/update_user', (req,res) =>{
    res.render('update_user');
})

module.exports = route