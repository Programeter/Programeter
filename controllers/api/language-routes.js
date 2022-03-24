const router = require('express').Router();
const { Language } = require('../../models')

// get all languages
router.get('/', async (req, res) => {
  try {
    const languageData = await Language.findAll();
    res.status(200).json(languageData)
  } catch (err){
    res.status(500).json(err)
  }

});
