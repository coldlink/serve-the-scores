//initialise the application
(function() {
	'use strict';

	angular.module('StSApp', ['ui.router', 'uiRouterStyles', 'btford.socket-io'])
		.config(config)
		//set timeout options
		.constant('ANIMATION_TIMEOUT', 1000)
		.constant('ANIMATION_TIMEOUT_500', 500)
		.constant('ANIMATION_TIMEOUT_750', 750)
		.constant('ANIMATION_TIMEOUT_1500', 1500)
		.constant('ANIMATION_TIMEOUT_2000', 2000);

	function config($urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');
	}
})();
