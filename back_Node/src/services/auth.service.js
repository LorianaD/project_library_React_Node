const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const SALT_ROUNDS = 10;

// s'enregistrer // Création du compte
async function register({email, password}) {
    
    // utilise bcrypt pour hasher le mp
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    // créeation de l'utilisateur ! stockage du mp en hashé
    return Users.create({email, password_hash: hash});
}

// validation des données de connexion (credential) // Connexion
async function validateCredentials(email, password) {
    // verification en bdd le user
    const user = await Users.findOne({where: {email}});
    // si pas de compte je stock l'execution de la fonction
    if (!user) return null;
    // compareson des mp
    const isValid = await bcrypt.compare(password, user.password_hash);
    // si la comparaison est bon, alors return isValid, sinon renvoi null
    return isValid ? user : null;
}

// generer le token
function generateToken(user) {
    return jwt.sign(
        // infos minimun à envoyer au client => payload
        {sub: user.id, role: user.role},
        process.env.JWT_TOKEN, // clé secrete
        {expiresIn: "3h"}
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        {sub: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
    );
}

modules.exports = {
    register,
    validateCredentials,
    generateToken,
    generateRefreshToken
};