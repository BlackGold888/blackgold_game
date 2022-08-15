import express from 'express';
import http from 'http';
import {GameSocket} from './GameSocket.js';

const app = express();

const server = http.createServer(app);
new GameSocket(server)

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
