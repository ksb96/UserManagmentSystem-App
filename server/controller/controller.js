let userDb = require('../model/model');

//api's
//create & save, new user (POST)
exports.create = (req,res)=>{
        // validate request
        if(!req.body){
            res.status(400).send({ 
                message : "Content can not be emtpy!"});
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
    if(req.query.id){
        const id = req.query.id;
    //single user 
    userDb.findById(id).then(data =>{
        if(!data){
            res.status(404).send({
                message: `User data not found!!!  ${id}`
            })
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message || `Unexpected error from our end, tbh!!!  ${id}`
        })
    })
    }else{
    //find - all
    userDb.find().then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "It's not you its us, Sorry"
        })
    })
    }
}

//update the user with ID's (PUT)
exports.update = (req,res)=>{
    //no data
    if(!req.body){
        return res.status(400).send({
            message: "data for update cannot be empty"
        })
    }
    //storing in var 'ID'
    const id = req.params.id;
    userDb.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data=>{
        if(!data){
            res.status(404).send({
                message: `Cannot update user with id:${id}. Maybe user not found`
            })
        }else{
            res.send(data)
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "It's not you its us, Sorry"
        })
    })
}

//delete user with ID (DELETE)
exports.delete = (req,res)=>{
    const id = req.params.id;
    userDb.findByIdAndDelete(id).then(data => {
            if(!data){
                res.status(404).send({ 
                    message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || `Could not delete user with id = ${id}`
            });
        });
}