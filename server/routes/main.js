const express = require('express');
const Router = express.Router();


const {signup, login , crtQna , getQna, crtUser , getUser} = require('../controllers/main');

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/crtQna').post(crtQna);
Router.route('/getQna').post(getQna);
Router.route('/crtUser').post(crtUser);
Router.route('/getUser').post(getUser);

module.exports = Router;
