const express = require('express');
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')

/** @desc main page
 *  @method /GET
 */
route.get('/', services.homeRoutes);

/** @desc add_users page
 *  @method /GET /add_user
 */
route.get('/add-user', services.add_user);

/** @desc update_user page
 *  @method /POST /update_user
 */
route.get('/update-user', services.update_user);

//API 
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route