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
    socket.on('master', (msg) => {
        console.log(msg);
        master = socket.id;
        io.emit('masterConnecte', msg);
    });

    // Réception d'un message envoyé par le client
    socket.on('messageEnvoye', (msg) => {
        console.log(msg);
        io.emit('messageRecu', msg);
    });

    // Réception d'un message envoyé par le client
    socket.on('lienEnvoye', (msg) => {
        console.log(msg);
        io.emit('lienRecu', msg);
    })

    // Envoie des informations d'un joueur pour le maître de jeu
    socket.on('persoEnvoi', (stat) => {
        console.log(stat);
        io.emit('persoRecu', stat);
    })
});

http.listen(666, function() {
    console.log('listening on *:666');
});