const router = require('express').Router();

const userRoute = require('./user-route');

router.use('/user', userRoute)

module.exports = router