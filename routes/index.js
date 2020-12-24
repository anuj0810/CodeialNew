const express = require('express');

const routes = express.Router();

const homeController = require('../controllers/homeControllers');

routes.get('/', homeController.home);


module.exports=routes