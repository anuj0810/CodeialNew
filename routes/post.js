const express = require('express');
const passport = require('passport');
const routes = express.Router();

const postControllers = require('../controllers/postControllers');

routes.post('/createPost', passport.checkAuthentication, postControllers.createPost);
routes.get('/destoryPost/:id', passport.checkAuthentication, postControllers.destoryPost);

module.exports=routes