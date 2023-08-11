const express = require('express');
const {quiz , user} = require('../models/user');
var randomstring = require('randomstring');

const signup = async (req, res) => {
	res.send({
		msg:"signup page"
	});
}

const login = async (req, res) => {
	try {
		let usrdata = await user.findOne({name : req.body.name , pwd : req.body.pwd})
		res.status(200).send({ uid : usrdata.uid , msg : "logged in" }); 
	} catch (err) {
		res.status(201).send({
			code : "err",
			msg : "user not found or password incorrect"
		});
	}
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
	const usr = await user.findOne(req.body);
	console.log(usr)
	res.status(200).send((usr));
}

const getQna = async(req, res) => {
	console.log(req.body.uid);
	var {uid , attempted} = await user.findOne({uid : parseInt(req.body.uid)});
	var newAttemp = attempted;
	const qnId = await quiz.find({});
	var rndm = Math.floor(Math.random() * qnId.length);
	var qn = await quiz.findOne({ qid : qnId[rndm].qid });
	if(attempted.length == qnId.length){
		console.log(req.params);
		res.status(201).send({
			code: "complete",
			msg: "all qns attempted"
		})
	}
	else {
		while(attempted.includes(qn.qid) == true){
			rndm = Math.floor(Math.random() * qnId.length);
			qn = await quiz.findOne({ qid : qnId[rndm].qid });
		}
		newAttemp.push(qn.qid);
		await user.updateOne({uid : uid , attempted : newAttemp});
		res.status(200).send(qn);
	}
	//if randomly selected qnId is attempted by user run random function again
}


module.exports = {signup, login , crtQna , getQna , crtUser , getUser};
