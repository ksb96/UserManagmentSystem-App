var Userdb = require('../model/model');

//api's
//create & save, new user (POST)
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be emtpy!"
        });
        return;
    }

    // create new user
    var user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    // save user in the database
    user.save(user).then(data => {
          res.redirect('/add-user');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id).then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `User data not found!!! ${id}`
                    })
                } else {
                    res.send(data)
                    // res.redirect('/update-user');
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || `Unexpected error from our end, tbh!! ${id}`
                })
            })
    } else {
        Userdb.find().then(user => {
                res.send(user)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "It's not you its us, Sorry"
                })
            })
    }
}

//update the user with ID's (PUT)
exports.update = (req, res) => {
    //no data
    if (!req.body) {
        return res.status(400).send({
            message: "data for update cannot be empty"
        })
    }
    //storing in var 'ID'
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update user with id:${id}. Maybe user not found`
            })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "It's not you its us, Sorry"
        })
    })
}

//delete user with ID (DELETE)
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Delete with id ${id}. Maybe id is wrong`
                })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || `Could not delete user with id = ${id}`
            });
        });
}