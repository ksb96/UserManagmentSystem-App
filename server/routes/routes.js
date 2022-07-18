const express = require('express');
const route = express.Router()

const services = require('../services/render')

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
route.get('/update_user', services.update_user);

module.exports = route