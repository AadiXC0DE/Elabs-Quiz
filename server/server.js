const {connect} = require('./db/connect');
const express = require('express');
const cors = require('cors');
const app = express();
const quizRoute = require('./routes/main');

app.use(express.json());
app.use(cors());

connect();

app.use('/api/v1/quiz' ,quizRoute);

app.listen(process.env.PORT || 8080, () => {
	console.log("Server is running on port 3000");
});
