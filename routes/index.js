const express = require('express');
const passport = require('passport');
// const { pass } = require('../config/mongoose');

const routes = express.Router();

const homeController = require('../controllers/homeControllers');

routes.get('/', homeController.home);

routes.get('/profile/:id',passport.checkAuthentication,homeController.profile);

routes.get('/signup', homeController.signUp);

routes.post('/createUser', homeController.createUser);

routes.get('/signin',homeController.signin)

routes.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/'},
    ) , homeController.createSession );

routes.get('/signout', homeController.signout);

routes.use('/post',require('./post'));

routes.use('/comment',require('./comment'));

routes.post('/updateUser/:id', homeController.updateUser)

module.exports=routes