const algorithm = 'aes-256-cbc';
const crypto = require('crypto');
require('dotenv').config();

// Function to encrypt text
exports.encrypt = (text) => {
    
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.NEXT_PUBLIC_SECRET_ENCRYPT), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
