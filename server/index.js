(function() {
	'use strict';

	//set up requires
	const {
		app,
		BrowserWindow,
		ipcMain
	} = require('electron');
	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const storage = require('electron-json-storage');

	//define bindables
	let router = express();
	let server = require('http').Server(router);
	let io = require('socket.io')(server);
	let mainWindow = null;

	//temp holder for saved score data
	let data = {};

	//set up electron window
	app.on('window-all-closed', () => app.quit());
	app.on('ready', () => {
		mainWindow = new BrowserWindow({
			width: 270,
			height: 480
		});
		mainWindow.loadURL('file://' + __dirname + '/index.html');

		mainWindow.on('closed', () => mainWindow = null);
	});

	//set up server
	//parse application/json
	router.use(bodyParser.json());

	//set up static route
	router.use(express.static(path.resolve('scoreboard')));

	//send html w/ scoreboard app to client
	router.get('/', (req, res) => res.sendfile(path.resolve('scoreboard/index.html')));

	//io configuration
	io.on('connection', function(socket) {
		socket.emit('data', data);
	});

	//listen on port 1337
	server.listen(1337);

	/*ipcMain Setup*/
	//on connection send data
	ipcMain.on('connect', function(event, arg) {
		storage.get('scoreboard-data', function(err, response) {
			if (err) {
				return console.log(err);
			}
			if (Object.keys(response).length === 0) {
				data = {
					main: {
						p1name: 'Player 1',
						p2name: 'Player 2',
						p1score: 0,
						p2score: 0,
						eventLeft: 'Event Left',
						eventRight: 'Event Right'
					}
				}
			} else {
				data = response;
			}
			event.sender.send('connect-reply', data);
		});
	});

	ipcMain.on('save', function(event, arg) {
		data = arg;
		storage.set('scoreboard-data', data, function(err) {
			if (err) {
				return console.log(err);
			}
			io.emit('savescore', data);
		});
	});
})();
