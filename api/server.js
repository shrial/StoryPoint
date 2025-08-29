const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // to use environment variables from a .env file


const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors()); // enables Cross-Origin Resource Sharing
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB!')) 
.catch(err => console.error('MongoDB connection error:', err)); 


// API Routes
app.use('/api/users', require('./routes/auth')); 
app.use('/api/stories', require('./routes/story')); 

// for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Story Sharing API!');
});

//again just testing
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
