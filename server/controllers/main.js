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
		console.log(qn);
		qn['qid'] = randomstring.generate(4);
		qn['set'] = req.params.id;
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

const eval = async(req, res) => {
	// take uid , qid and ans from req.body and match the correct answer with correctoption in db;
	// if correct then increment score by 1
	// respond with evaluation complete code
	let qnid = req.body.qid;
	let ans = req.body.ans;
	let qn = await quiz.findOne({qid : qnid});
	let usr = await user.findOne({uid : req.body.uid});
	try {
		if(qn.correctOption == ans){
			console.log("correct");
			await user.findOneAndUpdate({uid : req.body.uid} , {score : usr.score + 1} );
		}
		usr = await user.findOne({uid : req.body.uid});
		console.log(usr.score);
		res.status(200).send({
			code : "complete",
			msg : "evaluation complete"
		});
	}
	catch(err) {
		res.status(501).send({code : 501 , msg : "err occured"});
	}
	
}

const crtUser = async (req, res) => {
	req.body['uid'] = randomstring.generate(4);
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
	const qnId = await quiz.find({set: req.params.id});
	console.log(qnId);
	var listqns= [];
	for(var i = 0 ; i < qnId.length ; i++){
		listqns.push(qnId[i].qid);
	}
	console.log(listqns);
	var rndm = Math.floor(Math.random() * qnId.length);
	var qn = await quiz.findOne({ qid : qnId[rndm].qid , set : req.params.id });
	var stAttempted = attempted.filter((item) => {
		console.log(item)
		return (listqns.includes(item)); 
	});
	console.log(stAttempted);
	console.log(stAttempted.length + " " + attempted.length + " " + listqns.length + " " + req.params.id); 
	if(stAttempted.length >= listqns.length){
		console.log(req.params);
		res.status(201).send({
			code: "complete",
			msg: "all qns attempted"
		})
	}
	else {
		while(attempted.includes(qn.qid) == true){
			console.log(qnId.length);
			rndm = Math.floor(Math.random() * qnId.length);
			qn = await quiz.findOne({ qid : qnId[rndm].qid });
		} 
		newAttemp.push(qn.qid);
		await user.findOneAndUpdate({uid : uid} , {attempted : newAttemp});
		res.status(200).send(qn);
	}
	//if randomly selected qnId is attempted by user run random function again
}


module.exports = {signup, login , crtQna , getQna , crtUser , getUser , eval};
