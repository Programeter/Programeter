const router = require('express').Router();
const { Question, Option  } = require('../../models')

// CREATE new user
router.get('/', async (req, res) => {
    try {
      const questions = await Question.findAll({
        include: [{
            model: Option
        }]
      });
      
      res.status(200).json(questions);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
  module.exports = router;



