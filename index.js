import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const PORT = 5000;
const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', socket => {
  console.log('a user connected');
});
server.listen(PORT, () => console.log(`✅ server is connected to ${PORT}`));
