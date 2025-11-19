const { body } = require('express-validator');

// validation d'enregistrement
exports.registerRules = [
    body('email').isEmail().withMessage('email pas correct'),
    body('password').isLength({min:8}).withMessage('mini 8 caract')
];

//validation de connexion
exports.loginRules = [
    body('email').isEmail(),
    body('password').notEmpty()
]