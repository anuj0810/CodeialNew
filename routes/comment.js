const express = require('express');

const passport = require('passport');
const { route } = require('.');
// const { pass } = require('../config/mongoose');

const routes = express.Router();

const commentControllers = require('../controllers/commentControllers');

routes.post('/createComment', passport.checkAuthentication, commentControllers.createComment);
routes.get('/destoryComment/:id', passport.checkAuthentication, commentControllers.destoryComment);

module.exports=routes