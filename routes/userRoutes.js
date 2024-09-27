const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

router.post('/', async(req, res) => {
    const user = new User({ name: req.body.name, email: req.body.email });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

router.get('/:id', async (req,res) => {
    const { name } = req.query;
    const filter = name ? { name: new RegExp(name, 'i') } : {};
    const users = await User.find(filter);
    res.join(users);
});

router.get('view', async (req, res) => {
    const users = await User.find();
    res.render('users', { users });
});