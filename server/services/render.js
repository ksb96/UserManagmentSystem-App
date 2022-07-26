const axios = require('axios');

exports.homeRoutes = (req,res)=>{
    //GET request to /api/users
    axios.get('https://umanagmentapp.herokuapp.com/api/users').then((response)=>{
        // console.log(response.data);
        res.render('index', {users: response.data});
    }).catch(err=>{
        res.send(err);
    })
}

exports.add_user = (req,res)=>{
    res.render('add_user');
}

exports.update_user = (req,res)=>{
    axios.get('https://umanagmentapp.herokuapp.com/api/users', {
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
}