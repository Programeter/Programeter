const router = require('express').Router();
const { User, Question, Option, Language } = require('../models');
const withAuth = require('../utils/auth');
const searchHandler = require('../utils/search-handler');

// import library
const captcha = require("nodejs-captcha");

router.get('/', withAuth, async (req, res) => {
    // insert home page stuff here
  try {
    const userData = await User.findAll();
    const users = userData.map((user)=>
    user.get({plain:true})
    );
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      users: users
    });
    
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/search', async (req, res) => {
  const searchResults = await searchHandler(1, req.body.languages);
  res.status(200).json(searchResults);
});

router.post('/verify-captcha', (req, res) => {
  let captcha = req.body.captcha;
  if (req.session.captchaVal === captcha) {
    res.status(200).send({message: 'verified'});
  } else {
    res.status(400).send({message: 'Not Verified'});
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


  router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  try {
    const dbQestionData = await Question.findAll({
      include: [{
          model: Option
      }]
    });
    const questions = dbQestionData.map((question) => question.get({plain: true}));
    
    const dbLanguageData = await Language.findAll();

    const languages = dbLanguageData.map((language) => language.get({ plain: true }));
    // const questions = db_questionData.get({plain: true})
    // Create new Captcha
    const newCaptcha = captcha();

    const captchaData = { image: newCaptcha.image, width: ((newCaptcha.width).toString() + 'px'), height: ((newCaptcha.height).toString() + 'px') };

    req.session.captchaVal = newCaptcha.value;
  
    res.render('signup', {
      layout: 'main',
      loggedIn: req.session.loggedIn,
      questions: questions,
      languages: languages,
      captcha: captchaData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // let result = captcha();
  // req.session.captchaVal = result.value;
  // let source = result.image;

  // res.render('signup', {
  //   loggedIn: req.session.loggedIn,
  //   questions: questions,
  //   captcha: source
//   });
});


module.exports = router;
