const router = require('express').Router();

const userRoute = require('./user-routes');

router.use('/user', userRoute)

module.exports = router