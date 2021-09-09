const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
  body('name', "Name is requird").not().isEmpty(),
  body('email', "Please include a valid email").isEmail(),
  body('password', "Please enter password with 6 or more characters").isLength({ min: 6 }),
],
(req, res) => {
  console.log('req.body :>> ', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  
  res.send('User created');

});

module.exports = router;