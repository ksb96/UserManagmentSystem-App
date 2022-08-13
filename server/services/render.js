const axios = require('axios');

//root
exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function (response) {
            res.render('index', {
                users: response.data
            });
        }).catch(err => {
            res.send(err);
        })
}

//add
exports.add_user = (req, res) => {
    res.render('add_user');
}

//update
exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {
            params: {
                id: req.query.id
            }
        }).then(function (userdata) {
            res.render("update_user", {
                user: userdata.data
            })
        }).catch(err => {
            res.send(err);
        })
}