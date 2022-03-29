const router = require('express').Router();
const { User, Language, LanguageLink, Option, UserAnswer } = require('../../models');

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {model: Language, through: LanguageLink, as: 'user_languages'},
        {model: Option, through: UserAnswer, as: 'user_answers'}
      ]
    });
    
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET one user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {model: Language, through: LanguageLink, as: 'user_languages'},
        {model: Option, through: UserAnswer, as: 'user_answers'}
      ]
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        github_name: req.body.github_name
      });

      // for loop here
      for (let i = 0; i < req.body.answers.length; i++) {
        const newUserAnswer = await UserAnswer.create({
          user_id: dbUserData.id,
          option_id: req.body.answers[i]
        });
      }
      
      for (let i = 0; i < req.body.languages.length; i++) {
        const newLanguageLink = await LanguageLink.create({
          user_id: dbUserData.id,
          option_id: req.body.languages[i]
        });
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // Login
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }

      const user = dbUserData.get({ plain: true });
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user = user;
        
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;



