const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// import library
const captcha = require("nodejs-captcha");

// Create new Captcha
const newCaptcha = captcha();

// Value of the captcha
const value = newCaptcha.value;

// Image in base64 
const imagebase64 = newCaptcha.image;

// Width of the image
const width = newCaptcha.width;

// Height of the image
const height = newCaptcha.height;

router.get('/', async (req, res) => {
    // insert home page stuff here
  try {
    res.render('loginpage', {
      loggedIn: req.session.loggedIn
    });
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/verify-captcha', (req, res) => {
  let captcha = req.query.captcha;
  if (req.session.captchaVal === captcha) {
    res.send({message: 'verified'});
  } else {
    res.send({message: 'Not Verified'});
  }
});
  
// GET one user
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    const user = userData.get({ plain: true });

    res.render('user', { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('loginpage');
  });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  let result = captcha();
  req.session.captchaVal = result.value;
  let source = result.image;

  res.render('signup', {
    loggedIn: req.session.loggedIn,
    captcha: source
  });
});


module.exports = router;
