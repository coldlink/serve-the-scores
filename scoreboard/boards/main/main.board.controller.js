(function() {
	'use strict';

	angular.module('StSApp')
		.controller('MainBoardCtrl', MainBoardCtrl);

	function MainBoardCtrl($http, $socket, $scope) {
		let board = this;
    board.main = {};

    /*get data on state load*/
    $scope.$on('socket:data', (e, data) => {
			console.log('socket:data');
			console.log(data);
      board.main = data.main;
    });

    /*update data on score saved*/
    $socket.on('savescore', (data) => {
			console.log('savescore');
			console.log(data);
      board.main = data.main;
    });
	}
})();
