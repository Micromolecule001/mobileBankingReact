const express = require('express');
const router = express.Router();

const User = require('../class/user');

router.post('/signin', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.status(200).json({ message: 'Sign in successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  
  try {
    // new user method 
    const newUser = new User(email, password);

    // Add user to the list
    const success = User.addUser(newUser);

    if (success) {
      res.status(201).json({ message: 'User created successfully!' });
    } else {
      res.status(409).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


router.post('/signup-confirm', (req, res) => {
  console.log('post signup-confirm')
  const { email, code } = req.body;
  if (User.verifyCode(email, code)) {
    res.status(200).json({ message: 'Account confirmed and logged in.' });
  } else {
    res.status(400).json({ message: 'Invalid confirmation code.' });
  }
});

module.exports = router;
