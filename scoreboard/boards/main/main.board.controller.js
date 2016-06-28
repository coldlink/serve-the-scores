(function() {
	'use strict';

	angular.module('StSApp')
		.controller('MainBoardCtrl', MainBoardCtrl);

	function MainBoardCtrl($http, $socket, $scope, $timeout, ANIMATION_TIMEOUT) {
		let board = this;
		$scope.loaded = 0;
		board.main = {};

		/*get data on state load*/
		$scope.$on('socket:data', (e, data) => {
			//holds old board data
			$scope.old = data.main;
			//update new board data
			board.main = data.main;

			/*Set loaded after inital load animation finished*/
			$timeout(() => {
				$scope.loaded = 1;
			}, ANIMATION_TIMEOUT);
		});

		/*update data on score saved*/
		$socket.on('savescore', (data) => {
			$scope.old = data.main;
			$timeout(() => {
				board.main = data.main;
			}, ANIMATION_TIMEOUT);
		});
	}
})();
