const router = require('express').Router();

const userRoute = require('./user-routes');
const questionRoute = require('./question-routes');

const languageRoute = require('./language-routes');

router.use('/users', userRoute);
router.use('/questions', questionRoute);
router.use('/languages', languageRoute);

module.exports = router;