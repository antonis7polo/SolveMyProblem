const axios = require('axios');
const { Command } = require('commander');
const crypto = require('crypto');
const dotenv = require('dotenv');
const algorithm = 'aes-256-cbc';

dotenv.config();

const program = new Command();

program
    .version('1.0.0')
    .description('CLI tool to create admin users')
    .requiredOption('-u, --username <username>', 'Admin username')
    .requiredOption('-e, --email <email>', 'Admin email')
    .requiredOption('-p, --password <password>', 'Admin password')
    .option('-U, --url <url>', 'Backend URL', 'http://accounts_service:3005/create-admin')
    .parse(process.argv);

const options = program.opts();

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.SECRET_ENCRYPT), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

const createAdminUser = async () => {
    try {
        const encryptedHeader = JSON.stringify(encrypt(process.env.SECRET_STRING_SERVICES));
        const response = await axios.post(options.url, {
            username: options.username,
            email: options.email,
            password: options.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'custom-services-header': encryptedHeader
            }
        });

        if (response.status === 200) {
            console.log('User created successfully');
        }
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
};

createAdminUser();