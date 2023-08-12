const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = `mongodb+srv://amoghpreneur:${process.env.ATLAS_PASS}@cluster1.vx1tnwk.mongodb.net/quiz`;

async function connect () {
	await mongoose
	.connect(connectionString )
	.then(() => console.log("connected to db : quiz"))
	.catch((err) => console.log(err));
}

module.exports = {connect};
