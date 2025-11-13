const { Router } = require('express');
const booksController = require('../controllers/books.controller');

const router = Router();

router.get('/test', booksController.test);
router.get('/', booksController.booksList);
router.get('/:id', booksController.show);
router.post('/', booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.delete);

module.exports = router;