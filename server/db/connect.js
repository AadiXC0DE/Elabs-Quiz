const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/quiz';

async function connect () {
	await mongoose
	.connect(connectionString )
	.then(() => console.log("connected to db : quiz"))
	.catch((err) => console.log(err));
}

module.exports = {connect};
