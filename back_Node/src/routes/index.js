const { Router } = require('express');

const router =  Router();

router.use('/books', require('./books.routes'))

module.exports = router;