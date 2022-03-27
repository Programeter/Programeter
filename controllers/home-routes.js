const router = require('express').Router();
const { User, Question, Option } = require('../models');
const withAuth = require('../utils/auth');
const searchHandler = require('../utils/search-handler');
const seed = require('../seeds/seed');

// import library
const captcha = require("nodejs-captcha");

router.get('/', async (req, res) => {
    // insert home page stuff here
  try {
    await seed();
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

router.get('/search', async (req, res) => {
  // let users = await User.findAll();
  // let possibleUsers = [];
  // const numOfUsers = users.length;
  // let usersTried1 = 0;
  // let usersTried2 = 0;
  // let repoList = [];
  // for (const user in users) {
  //     usersTried1++;
  //     if (1 == users[user].dataValues.id) {
  //         continue;
  //     }
  //     const compatibility = await compatibilityGenerator(1, users[user].dataValues.id, req.body.languages);
  //     if (await compatibility.personal_compatibility > 1 && await compatibility.work_compatibility > 1 && await compatibility.language_compataibility > 1) {
  //         possibleUsers.push(users[user]);
  //     }
  //     if (usersTried1 >= numOfUsers) {
  //         for (const possibleUser in possibleUsers) {
  //             usersTried2++;
  //             const repos = await githubHandler.searchByLanguage(possibleUsers[possibleUser].dataValues.github_name, req.body.languages);
  //             repoList = repoList.concat(repos);
  //             if (usersTried2 >= possibleUsers.length) {
  //                 // console.log(repoList);
  //                 res.status(200).send(repoList);
  //             }
  //         }
  //     }
  // }
  const searchResults = await searchHandler(1, req.body.languages);
  res.status(200).json(searchResults);
});

router.get('/verify-captcha', (req, res) => {
  let captcha = req.query.captcha;
  if (req.session.captchaVal === captcha) {
    res.satus(200).send({message: 'verified'});
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
    
    // const questions = db_questionData.get({plain: true})
    // Create new Captcha
    const newCaptcha = captcha();

    const captchaData = { image: newCaptcha.image, width: ((newCaptcha.width).toString() + 'px'), height: ((newCaptcha.height).toString() + 'px') };

    req.session.captchaVal = newCaptcha.value;
  
    res.render('signup', {
      loggedIn: req.session.loggedIn,
      questions: questions,
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
