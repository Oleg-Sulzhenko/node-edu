const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
   } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
   }
});

// @route   POST api/auth
// @desc    Athentificate User
// @access  Public
router.post('/', [
  body('email', "Please include a valid email").isEmail(),
  body('password', "Password is required").isLength({ min: 6 }),
],
async (req, res) => {
  console.log('POST api/auth req.body :>> ', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {email, password } = req.body;

  try {
    // Check if the User exist
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{msg: 'Invalid credentials'}] });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ errors: [{msg: 'Invalid credentials 2'}] });
    }

    // Return JWT
    const payload = {user: {id: user.id}}
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      }
    ); 

  } catch(err) {
    console.log('err.message :>> ', err.message);
    res.status(500).send('Server Error');
  }
  
});

module.exports = router;