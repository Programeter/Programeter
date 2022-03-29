const router = require('express').Router();
const { User, Question, Option, Language, LanguageLink } = require('../models');
const withAuth = require('../utils/auth');
const searchHandler = require('../utils/search-handler');

// import library
const captcha = require("nodejs-captcha");
const generateCompatibility = require('../utils/compatibility-generator');

router.get('/', withAuth, async (req, res) => {
  if (req.query.users) {
    res.render('dashboard', {
      users: JSON.parse(req.query.users)
    });
    return;
  }  // insert home page stuff here
  try {
    const userData = await User.findAll({include: [{
      model: Language,
      through: LanguageLink,
      as: 'user_languages'
    }]});
    const usersInfo = userData.map((user)=>
    user.get({plain:true})
    );
    const users = [];
    for (let i = 0; i < usersInfo.length; i++) {
      const languages = usersInfo[i].user_languages.map((language) => { return language.language_name; });
      const compatibility = await generateCompatibility(req.session.user.id, usersInfo[i].id, languages);
      const userObject = {
        id: usersInfo[i].id,
        email: usersInfo[i].email,
        user_name: usersInfo[i].user_name,
        github_name: usersInfo[i].github_name,
        user_languages: usersInfo[i].user_languages,
        personal_compatibility: compatibility.personal_compatibility,
        work_compatibility: compatibility.work_compatibility,
        language_compatibility: compatibility.language_compataibility
      };
      users.push(userObject);
    }
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      users: users
    });
    
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  try {
    const searchResults = await searchHandler(1, JSON.parse(req.query.languages));
    // res.session.searchResults = searchResults;
    const users = [];
      for (let i = 0; i < searchResults.length; i++) {
        const user = searchResults[i].user;
        const compatibility = searchResults[i].compatibility;
        const languages = user.user_languages.map((language) => { return language.language_name; });
        const userObject = {
          id: user.id,
          email: user.email,
          user_name: user.user_name,
          github_name: user.github_name,
          user_languages: languages,
          personal_compatibility: compatibility.personal_compatibility,
          work_compatibility: compatibility.work_compatibility,
          language_compatibility: compatibility.language_compataibility
        };
        users.push(userObject); 
      }
    res.redirect('/?users=' + JSON.stringify(users));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/searchresults', async (req, res) => {
  try {
    const resultData = JSON.parse(req.query.users);
    res.render('searchresults', {
      users: resultData
    });
  } catch (err) {
    console.log(err);
    res.status(500).jeons(err);
  }
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

router.get('/resume', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  res.render('resume');
});


module.exports = router;
