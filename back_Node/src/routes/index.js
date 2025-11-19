const { Router } = require('express');
const authMiddleware = require('../middlewares/auth');

const router =  Router();

router.use('/books', authMiddleware, require('./books.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;