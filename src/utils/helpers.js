const bcrypt = require('bcrypt');

// Générer un hash pour un mot de passe
async function hashPassword(password) {
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    console.log(password);
    const saltRounds = 10; // Nombre de tours pour générer le sel
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = {
    hashPassword,
    verifyPassword,
};