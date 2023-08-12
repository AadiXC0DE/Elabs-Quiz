const express = require('express');
const Router = express.Router();


const {signup, login , crtQna , getQna, crtUser , getUser , eval} = require('../controllers/main');

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/crtQna/:id').post(crtQna);
Router.route('/getQna/:id').post(getQna);
Router.route('/eval/:id').post(eval);
Router.route('/crtUser').post(crtUser);
Router.route('/getUser').post(getUser);

module.exports = Router;
