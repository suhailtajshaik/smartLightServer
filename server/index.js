'use strict';

const express = require('express');
const path = require('path');
const config = require('./config.js');

const app = express();

app.use(express.static(path.join('..', 'client')));
require('./routes')(app);



const server = app.listen(config.port, function () {
	var port = config.port;
	console.log('\nExpress server listening on port ' + port + ', in ' + config.env + ' mode');
	console.log("open" + config.protocol + "://" + config.hostname + ":" + port);
})

var io = require('socket.io').listen(server)
require('./sockets')(io);

// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
// 	console.log("Connected...");
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });


server.on('error', function (e) {
	if (e.code === 'EADDRINUSE') {
		console.log('ADDRESS IN USE');
		console.log('\nExpress server listening on port ' + e.port + ', in ' + config.env + ' mode')
	} else {
		process.exit(1);
	}
})