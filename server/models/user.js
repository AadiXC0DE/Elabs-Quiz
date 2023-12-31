const mongoose = require('mongoose');

const userSchema = {

	name : {
		type : String
	},
	pwd : {
		type : String,
		required : [true , "give a password"]
	},
	uid : {
		type : String 
	},
	score : {
		type : Number,
		default : 0
	},
	attempted : {
		type : [String] 
	},
	quizAttempted : {
		type : [String] 
	}

}

const quizSchema = {
	set : {
		type : String,
		value : "default"
	},
	qid : {
		type : String,
		required : [true , "give a unique ID"]
	},
	question : {
		type : String
	},
	options : {
		type : [String]
	},
	correctOption : {
		type : String,
	}
}

const user = mongoose.model('User' , userSchema);
const quiz = mongoose.model('qna' , quizSchema);

module.exports = { user , quiz }
