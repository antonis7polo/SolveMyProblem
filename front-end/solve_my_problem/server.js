const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();

    // Middleware
    server.use(bodyParser.json());


    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 4000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Error preparing Next.js app:', err);
    process.exit(1);
});
