(function() {
	'use strict';

	angular.module('StSApp')
		.controller('MainBoardCtrl', MainBoardCtrl);

	function MainBoardCtrl($http, $socket, $scope, $timeout, ANIMATION_TIMEOUT) {
		let board = this;
		$scope.loaded = 0;
		board.main = {};

		/*get data on state load and save*/
		$scope.$on('socket:data', (e, data) => {
			//holds old board data
			board.old = data.main;
			//update new board data
			$timeout(() => board.main = data.main, $scope.loaded ? ANIMATION_TIMEOUT : 0);

			/*Set loaded after inital load animation finished*/
			if (!$scope.loaded) {
				$timeout(() => {
					$scope.loaded = 1;
				}, ANIMATION_TIMEOUT);	
			}
		});
	}
})();
