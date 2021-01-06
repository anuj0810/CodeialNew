const express = require('express');

const passport = require('passport');
const { pass } = require('../config/mongoose');

const routes = express.Router();

const homeController = require('../controllers/homeControllers');

routes.get('/', passport.checkAuthentication, homeController.home);

routes.get('/profile',passport.checkAuthentication,homeController.profile);

routes.get('/signup', homeController.signUp);

routes.post('/createUser', homeController.createUser);

routes.get('/signin',homeController.signin)

routes.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/'},
    ) , homeController.createSession );

routes.get('/signout', homeController.signout);

routes.post('/createPost', passport.checkAuthentication, homeController.createPost);

module.exports=routes