const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const githubHandler = require('../utils/GithubHandler');
const compatibilityGenerator = require('../utils/compatibility-generator');

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

router.get('/', withAuth, async (req, res) => {
    // insert home page stuff here
  try {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn
    });
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  let users = await User.findAll();
  let possibleUsers = [];
  const numOfUsers = users.length;
  let usersTried1 = 0;
  let usersTried2 = 0;
  let repoList = [];
  for (const user in users) {
      usersTried1++;
      if (1 == users[user].dataValues.id) {
          continue;
      }
      const compatibility = await compatibilityGenerator(1, users[user].dataValues.id, req.body.languages);
      if (await compatibility.personal_compatibility > 1 && await compatibility.work_compatibility > 1 && await compatibility.language_compataibility > 1) {
          possibleUsers.push(users[user]);
      }
      if (usersTried1 >= numOfUsers) {
          for (const possibleUser in possibleUsers) {
              usersTried2++;
              const repos = await githubHandler.searchByLanguage(possibleUsers[possibleUser].dataValues.github_name, req.body.languages);
              repoList = repoList.concat(repos);
              if (usersTried2 >= possibleUsers.length) {
                  // console.log(repoList);
                  res.status(200).send(repoList);
              }
          }
      }
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
