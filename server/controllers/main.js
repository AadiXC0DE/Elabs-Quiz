const express = require('express');
const {quiz , user} = require('../models/user');
var randomstring = require('randomstring');

const signup = async (req, res) => {
	res.send({
		msg:"signup page"
	});
}

const login = async (req, res) => {
}

const crtQna = async(req, res) => {
	try {
		const qn = req.body;
		qn['qid'] = randomstring.generate(4);
		quiz.create(qn);
		//add a validation method that ensures unique qid
		console.log(qn);
	} 
	catch (err) {
		console.log("err occur" + err);
		res.status(501);
	}
	res.status(200).send();
}

const crtUser = async (req, res) => {
	user.create(req.body);
	res.status(200).send({
		msg : "user created"
	});
}

const getUser = async (req, res) => {
	const user = user.findOne(req.body);
	res.status(200).send(user);
}

const getQna = async(req, res) => {
	const {attempted} = user.findOne(req.body);
	const qnId = quiz.findOne({});
	console.log(qnId.length())
	
	const giveQ = () => {
		var rndm = Math.random()*qnId.length();
		while(attemted.find(qnId[rndm].qid)) {
			rndm = Math.random()*qnId.length();
		}
		return qnId;
	}//if randomly selected qnId is attempted by user run random function again
	res.status(200).send(qnId);
}


module.exports = {signup, login , crtQna};
