const express = require('express');
const route = express.Router()
const axios = require('axios');

// const services = require('../services/render')
const controller = require('../controller/controller')


//API 
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

/** @desc main page
 *  @method /GET
 */
route.get('/', (req,res)=>{
        //GET request to /api/users
        axios.get('http://localhost:3000/').then((response)=>{
            // console.log(response.data);
            res.render('index', {users: response.data});
        }).catch(err=>{
            res.send(err);
        })
});

/** @desc add_users page
 *  @method /GET /add_user
 */
route.get('/add-user', (req,res)=>{
    axios.get('http://localhost:3000/',{
        params:{
            id:req.query.id
        }
    }).then((adddata)=>{
        res.render('add_user',{
            add:adddata.data
        })
    }).catch(err=>{
        res.send(err);
    })
    res.render('add_user');
});

/** @desc update_user page
 *  @method /POST /update_user
 */
route.get('/update-user', (req, res)=>{
    axios.get('http://localhost:3000/', {
        params: {
            id:req.query.id
        }
    }).then((userdata)=>{
        res.render('update_user',{
            user:userdata.data
        })
    }).catch(err=>{
        res.send(err);
    })
    res.render('update_user');
});

module.exports = route