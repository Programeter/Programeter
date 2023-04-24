const router = require('express').Router();
const { User, Question, Option, Language, LanguageLink } = require('../models');
const withAuth = require('../utils/auth');
const searchHandler = require('../utils/search-handler');
const seedDatabase = require('../seeds/seed');

// import library
const captcha = require("nodejs-captcha");
const generateCompatibility = require('../utils/compatibility-generator');
const { getRepos, getLanguages, searchByLanguage } = require('../utils/github-handler');

router.get('/', withAuth, async (req, res) => {
  // if (req.query.users) {
  //   const users = JSON.parse(req.query.users);
  //   res.render('dashboard', {
  //     loggedIn: req.session.loggedIn,
  //     users: users
  //   });
  //   return;
  // }  // insert home page stuff here
  try {
    await seedDatabase();
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
    users.sort((a,b) => {
      const a_avg = (a.personal_compatibility + a.work_compatibility + a.language_compatibility) / 3;
      const b_avg = (b.personal_compatibility + b.work_compatibility + b.language_compatibility) / 3;
      if (a_avg < b_avg) {
        return +1;
      } else if ( a_avg > b_avg) {
        return -1;
      } else {
        return 0;
      }
    });
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
    const searchResults = await searchHandler(req.session.user.id, JSON.parse(req.query.languages));
    // res.session.searchResults = searchResults;
    const users = [];
      for (let i = 0; i < searchResults.length; i++) {
        const user = searchResults[i].user;
        const compatibility = searchResults[i].compatibility;
        // const languages = user.user_languages.map((language) => { return language.language_name; });
        const userObject = {
          id: user.id,
          email: user.email,
          user_name: user.user_name,
          github_name: user.github_name,
          user_languages: user.user_languages,
          personal_compatibility: compatibility.personal_compatibility,
          work_compatibility: compatibility.work_compatibility,
          language_compatibility: compatibility.language_compataibility
        };
        users.sort((a,b) => {
          const a_avg = (a.personal_compatibility + a.work_compatibility + a.language_compatibility) / 3;
          const b_avg = (b.personal_compatibility + b.work_compatibility + b.language_compatibility) / 3;
          if (a_avg < b_avg) {
            return +1;
          } else if ( a_avg > b_avg) {
            return -1;
          } else {
            return 0;
          }
        });
        users.push(userObject); 
      }
      req.session.searchResults = searchResults;
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
  const userData = await User.findByPk(req.params.id, { include: [{
    model: Language,
    through: LanguageLink,
    as: 'user_languages',
  }]
  });
  const known_languages = userData.user_languages.map((language) => {return language.dataValues.language_name;});
  if (req.session.searchResults) {
    const userData = req.session.searchResults.find((user) => user.user.id == req.params.id);
    if (userData != undefined) {
      res.render('userprofile', {
        loggedIn: req.session.loggedIn,
        user: userData,
        languages: known_languages
      });
      return;
    }
  }
    const searchingUserData = await User.findByPk(req.session.user.id, { include: [{
      model: Language,
      through: LanguageLink,
      as: 'user_languages',
    }]
    });
    const languages = searchingUserData.user_languages.map((language) => {return language.dataValues.language_name;});
    const userInfo = userData.get({ plain: true });
    const repos = await searchByLanguage(userInfo.github_name, languages);
    
    const user_Data = {
      user: userInfo,
      repos: repos
    };
    const user = {
      user: user_Data,
    };

    res.render('userprofile', { 
      loggedIn: req.session.loggedIn, 
      user: user_Data, 
      languages: known_languages });
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
    res.redirect('/');
    return;
  }

  res.render('resume', {
    loggedIn: req.session.loggedIn
  });
});


module.exports = router;
