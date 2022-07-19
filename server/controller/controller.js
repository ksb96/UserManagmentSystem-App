let userDb = require('../model/model');

//api's
//create & save, new user (POST)
exports.create = (req,res)=>{
        // validate request
        if(!req.body){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }
    
        // create new user
        const user = new userDb({
            name : req.body.name,
            email : req.body.email,
            gender: req.body.gender,
            status : req.body.status
        })
    
        // save user data in database
        user.save(user).then(data => {
                res.send(data)
                // res.redirect('/add-user');
            }).catch(err =>{
                res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
                });
            });
}

//retrieve and return users/same for single user too (GET)
exports.find = (req,res)=>{
    //find, findOne/byID
    userDb.findOne().then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "It's not you its us, Sorry"
        })
    })
}

//update the user with ID's (PUT)
exports.update = (req,res)=>{

}

//delete user with ID (DELETE)
exports.delete = (req,res)=>{

}