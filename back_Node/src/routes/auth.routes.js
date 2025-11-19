const { Router } = require("express");
const authController = require('../controllers/auth.controller');
const { registerRules, loginRules } = require('../middlewares/validators/auth.validator');

const router = Router();

router.post('/register', registerRules, authController.register);
router.post('/login', loginRules, authController.login);

module.exports = router;