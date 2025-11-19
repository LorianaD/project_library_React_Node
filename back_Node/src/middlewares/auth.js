// outil pour décoder et vérifier les token jwt
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // get authorization dans le header de ma request
    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'pas de token trouvé',
            data: null
        })
    }

    // extraire la partie qui nous interesse
    // extraire la partie APRES le bearer
    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = payload;
        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'token invalide'
        })
    }
}