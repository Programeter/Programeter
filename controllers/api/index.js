const router = require('express').Router();

const userRoute = require('./user-routes');
const questionRoute = require('./question-routes');

router.use('/user', userRoute);
router.use('/questions', questionRoute);

module.exports = router;