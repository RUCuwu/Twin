const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
    try{
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

router.post('/', async(req, res) => {
    const comment = new Comments({ name: req.body.name, email: req.body.email });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;