const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {}; // Menyimpan data room
    
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/Pilih_game.html', (req, res) => {
    res.sendFile(__dirname + '/Pilih_game.html');
});

app.get('/Game_info.html', (req, res) => {
    res.sendFile(__dirname + '/Game_info.html');
});

app.get('/Multiplayer.html', (req, res) => {
    res.sendFile(__dirname + '/Multiplayer.html');
});

app.get('/Main.html', (req, res) => {
    res.sendFile(__dirname + '/Main.html');
});


io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // Bergabung ke room
    socket.on('joinRoom', (roomId) => {
        if (!rooms[roomId]) {
            rooms[roomId] = { players: [] };
        }
        if (rooms[roomId].players.length < 2) { // Batasi 2 pemain per room
            socket.join(roomId);
            rooms[roomId].players.push(socket.id);
            socket.emit('roomJoined', roomId);

            // Beritahu pemain lain di room
            if (rooms[roomId].players.length === 2) {
                io.to(roomId).emit('startGame');
            }
        } else {
            socket.emit('roomFull');
        }
    });

    // Mengirim data posisi pemain
    socket.on('updatePlayer', (data) => {
        const { roomId, player, x, y } = data;
        socket.to(roomId).emit('playerMoved', { player, x, y });
    });

    // Mengirim data tembakan
    socket.on('shoot', (data) => {
        const { roomId, bullet } = data;
        socket.to(roomId).emit('bulletFired', bullet);
    });

    // Menangani disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        for (const roomId in rooms) {
            rooms[roomId].players = rooms[roomId].players.filter(id => id !== socket.id);
            if (rooms[roomId].players.length === 0) {
                delete rooms[roomId];
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});