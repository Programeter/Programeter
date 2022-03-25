const router = require('express').Router();

const userRoute = require('./user-routes');
const questionRoute = require('./question-routes');
const languageRoute = require('./language-routes');

router.use('/user', userRoute);
router.use('/questions', questionRoute);
router.use('/language', languageRoute);

module.exports = router;