var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var master;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Un joueur est connecté', socket.id);
    io.emit('connect', socket);

    // On indique qu'on est le maître de jeu
    socket.on('master', (id) => {
        console.log(id, socket.id);
    });

    // Réception d'un message envoyé par le client
    socket.on('messageEnvoye', (message) => {
        console.log(message);
        io.emit('messageRecu', message);
    });

    // Réception d'un message envoyé par le client
    socket.on('lienEnvoye', (message) => {
        console.log(message);
        io.emit('lienRecu', message);
    })

    // Envoie des informations d'un joueur pour le maître de jeu
    socket.on('persoEnvoi', (message) => {
        console.log(message);
        io.emit('persoRecu', message);
    })
});

http.listen(6666, function() {
    console.log('listening on *:6666');
});