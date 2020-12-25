const express = require('express');

const routes = express.Router();

const homeController = require('../controllers/homeControllers');

routes.get('/', homeController.home);

routes.get('/profile',homeController.profile);

routes.get('/signup', homeController.signUp);

routes.post('/createUser', homeController.createUser);

routes.get('/signin', homeController.signIn);
module.exports=routes