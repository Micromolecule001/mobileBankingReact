// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Import auth routes
const auth = require('./auth');
const wallet = require('./wallet')

// Use the auth routes
router.use('/auth', auth);
router.use('/wallet', wallet)

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

module.exports = router
