const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Story = require('../models/Story');
const User = require('../models/User');
const {getAllStories, createStory, getStoryById, likeStory,addComment} = require('../controllers/storyCont');
const { get } = require('mongoose');

// get all stories
router.get('/', getAllStories);

// post new story
router.post('/', auth, createStory);

//get one story by id
router.get('/:storyId', getStoryById);

// like or unlike a story
router.post('/:storyId/like', auth, likeStory);

//post new comment
router.post('/:storyId/comments', auth, addComment);


module.exports = router;