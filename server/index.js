(function () {
  'use strict';

  //set up requires
  const {app, BrowserWindow, ipcMain} = require('electron');
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');

  //define bindables
  let router = express();
  let server = require('http').Server(router);
  let io = require('socket.io')(server);
  let mainWindow = null;

  let data = {
    main: {
      p1name: 'Player 1',
      p2name: 'Player 2',
      p1score: 0,
      p2score: 1,
      eventLeft: 'Event Left',
      eventRight: 'Event Right'
    }
  }; //holder for saved score data

  //set up electron window
  app.on('window-all-closed', () => app.quit());

  app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 270, height : 480});
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', () => mainWindow = null);
  });

  //set up listening server
  //parse application/json
  router.use(bodyParser.json());

  //set up static route
  router.use(express.static(path.resolve('scoreboard')));

  //send html w/ scoreboard app to client
  router.get('/', (req, res) => res.sendfile(path.resolve('scoreboard/index.html')));

  //route to get current score data
  router.get('/data', (req, res) => res.status(200).json(data));

  //io configuration
  io.on('connection', function (socket) {
      console.log('\nuser connected');
      socket.emit('data', data);
  });

  //listen on port 1337
  server.listen(1337, () => console.log('Access scoreboard from http://localhost:1337'));
})();
