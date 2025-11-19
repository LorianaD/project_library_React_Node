const { Router } = require('express');
const booksController = require('../controllers/books.controller');
const uploadBookFile = require('../middlewares/UploadFile');
const requireAdmin = require('../middlewares/requireRolesAdmin');

const router = Router();

// test du controller
router.get('/test', booksController.test);

// routes du controller
router.get('/', booksController.booksList);
router.get('/:id', booksController.show);
router.post('/', booksController.create);// uploadBookFile,
router.put('/:id', booksController.update);
router.delete('/:id',requireAdmin, booksController.delete);

// une route spécial pour l'image
router.post('/:id/cover',uploadBookFile.single('cover'), booksController.uploadCover);


module.exports = router;