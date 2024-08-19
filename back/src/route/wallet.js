const express = require('express');
const router = express.Router();

const User = require('../class/user');
const Payment = require('../class/payment')

router.post('/main', (req, res) => {
  const { email } = req.body
  const user = User.getUserByEmail(email)
  if (user) {
    res.status(200).json({ message: 'Account confirmed and logged in.', user: user });
  } else {
    res.status(400).json({ message: 'Invalid confirmation code.' });
  }
});

router.post('/receive', (req, res) => {
  const { amount, email, from } = req.body;

  // Convert amount to a float
  const amountFloat = parseFloat(amount);

  // Check if the amount is valid
  if (isNaN(amountFloat)) {
    return res.status(400).json({ message: 'Invalid amount format.' });
  }

  // Split amount into dollars and cents
  const dollars = Math.floor(amountFloat);
  const cents = Math.round((amountFloat - dollars) * 100);
  

  // Ensure cents always has two digits
  const formattedCents = cents < 10 ? `0${cents}` : cents;
 
  // Create payment instance with split amount
  const payment = new Payment(email, from, null, '+', { dollars, cents: formattedCents });

  const result = User.addPayment(payment, email);

  if (result) {
    res.status(200).json({ message: 'Payment processed successfully.' });
  } else {
    res.status(400).json({ message: 'Error processing payment.' });
  }
});

router.post('/send', (req, res) => {
  const { amount, email, to } = req.body;

  // Convert amount to a float
  const amountFloat = parseFloat(amount);

  // Check if the amount is valid
  if (isNaN(amountFloat)) {
    return res.status(400).json({ message: 'Invalid amount format.' });
  }

  // Split amount into dollars and cents
  const dollars = Math.floor(amountFloat);
  const cents = Math.round((amountFloat - dollars) * 100);

  // Ensure cents always has two digits
  const formattedCents = cents < 10 ? `0${cents}` : cents;

  // Create payment instance with split amount
  const payment = new Payment(email, null, to, '-', { dollars, cents: formattedCents });
  const result = User.addPayment(payment, email);
  
  const paymentTo = new Payment(to, email, null, '+', { dollars, cents: formattedCents })
  User.addPayment(paymentTo, to)

  if (result) {
    res.status(200).json({ message: 'Payment processed successfully.' });
  } else {
    res.status(400).json({ message: 'Error processing payment.' });
  }
});

module.exports = router;
