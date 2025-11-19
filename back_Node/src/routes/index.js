const { Router } = require('express');

const router =  Router();

router.use('/books', require('./books.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;