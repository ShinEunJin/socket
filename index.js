import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const PORT = 5000;
const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// 1. io.on 'connection'으로 socket.io 열기
io.on('connection', socket => {
  // 3. 'chat message' socket.on으로 리스너 발생
  socket.on('chat message', msg => {
    // 4. 받아온 메세지를 다시 emit 보내기
    io.emit('chat message', msg);
    // socket.emit('chat message', msg) -> sender-client 에게만 보내기 (내 화면에만 메세지 보임)
    // socket.broadcast.emit('chat message', msg) -> sender-client를 제외하고 나머지 client들 모두에게 보내기 (나 제외 다른 애들에게만 메세지 보임)
    // io.emit('chat message', msg) -> sender-client 포함, 연결된 모든 client 에게 보내기 (나하고 다른 애들 모두 메세지 보임)
  });
});

server.listen(PORT, () => console.log(`✅ server is connected to ${PORT}`));
