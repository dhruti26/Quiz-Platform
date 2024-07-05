const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quizmaker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/', quizRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
