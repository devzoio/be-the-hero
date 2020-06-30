//para gerar ID e criptografar códigos
const crypto = require('crypto')

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}