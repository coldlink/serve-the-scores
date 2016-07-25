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

	//default config object
	const defaultConfigData = [{
		name: 'main',
		data: [
			[{
				key: 'p1name',
				value: 'Player 1',
				name: 'Player 1',
				type: 'text'
			}, {
				key: 'p2name',
				value: 'Player 2',
				name: 'Player 2',
				type: 'text'
			}],
			[{
				key: 'p1score',
				value: 0,
				name: 'Player 1 Score',
				type: 'number'
			}, {
				key: 'p2score',
				value: 0,
				name: 'Player 2 Score',
				type: 'number'
			}],
			[{
				key: 'eventLeft',
				value: 'Event Left',
				name: 'Event Left',
				type: 'text'
			}, {
				key: 'eventRight',
				value: 'Event Right',
				name: 'Event Right',
				type: 'text'
			}],
			[{
				key: 'buttonSwap',
				value: 'Swap Players',
				name: '',
				type: 'button',
				method: 'swap', //function you want to call
				params: 'p1name,p2name,p1score,p2score'
			}, {
				key: 'buttonReset',
				value: 'Reset Scores',
				name: '',
				type: 'button',
				method: 'reset',
				params: 'p1score,p2score'
			}]
		]
	}, {
		name: 'commentatorCamera',
		data: [
			[{
				key: 'cName1',
				value: 'Commentator One',
				name: 'Commentator One',
				type: 'text'
			}, {
				key: 'cName2',
				value: 'Commentator Two',
				name: 'Commentator Two',
				type: 'text'
			}],
			[{
				key: 'cTwit1',
				value: '@twitter',
				name: 'Twitter Commentator One',
				type: 'text'
			}, {
				key: 'cTwit2',
				value: '@twitter',
				name: 'Twitter Commentator Two',
				type: 'text'
			}],
			[{
				key: 'buttonSwap',
				value: 'Swap',
				name: '',
				type: 'button',
				method: 'swap', //function you want to call
				params: 'cName1,cName2,cTwit1,cTwit2'
			}]
		]
	}];


	//define bindables
	let router = express();
	let server = require('http').Server(router);
	let io = require('socket.io')(server);
	let mainWindow = null;

	//holder for saved score data
	let scoreData = {};
	//holder for saved configuration
	let configData = [];

	//set up electron window
	app.on('window-all-closed', () => app.quit());
	app.on('ready', () => {
		mainWindow = new BrowserWindow({
			width: 300,
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
		socket.emit('data', scoreData);
	});

	//listen on port 1337
	server.listen(1337);

	/*ipcMain Setup*/
	//on connection send data
	ipcMain.on('connect', function(event, arg) {
		storage.get('config-scoreboard', function(err, response) {
			if (err) {
				throw err;
			}
			if (Object.keys(response).length === 0) {
				configData = defaultConfigData;
			} else {
				// configData = defaultConfigData;
				configData = response;
			}

			buildScoreData();
			return event.sender.send('connect-reply', configData);
		});
	});

	ipcMain.on('save', function(event, arg) {
		configData = JSON.parse(arg);
		storage.set('config-scoreboard', configData, function(err) {
			if (err) {
				throw err;
			}

			return buildScoreData(true);
		});
	});

	function buildScoreData(emit) {
		configData.forEach(config => {
			//initalise board object
			scoreData[config.name] = {};

			//set key value to send to client
			config.data.forEach(data => {
				data.forEach(kv => {
					scoreData[config.name][kv.key] = kv.value;
				});
			});
		});
		if (emit) io.emit('data', scoreData);
	}
})();
