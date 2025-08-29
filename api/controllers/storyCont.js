const Story = require('../models/Story');

// get all stories
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// post new story
exports.createStory = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newStory = new Story({
            title,
            content,
            author: req.user.id,
        });
        const story = await newStory.save();
        res.status(201).json(story);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// get a single story by its ID
exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId)
            .populate('author', 'username')
            .populate('comments.user', 'username');
        if (!story) {
            return res.status(404).json({ msg: 'Story not found' });
        }
        res.json(story);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// like or unlike a story
exports.likeStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).json({ msg: 'Story not found' });
        }

        if (story.likes.some(like => like.equals(req.user.id))) {
            story.likes = story.likes.filter(like => !like.equals(req.user.id));
        } else {
            story.likes.push(req.user.id);
        }

        await story.save();
        res.json(story.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// add a comment to a story
exports.addComment = async (req, res) => {
    const { text } = req.body;
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).json({ msg: 'Story not found' });
        }

        const newComment = { user: req.user.id, text };
        story.comments.unshift(newComment);
        await story.save();

        const populatedStory = await Story.findById(req.params.storyId).populate('comments.user', 'username');
        res.json(populatedStory.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};