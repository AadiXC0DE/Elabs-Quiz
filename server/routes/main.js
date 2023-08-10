const express = require('express');
const Router = express.Router();


const {signup, login , crtQna} = require('../controllers/main');

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/crtQna').post(crtQna);

module.exports = Router;
