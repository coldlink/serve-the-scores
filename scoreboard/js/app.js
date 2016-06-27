//initialise the application
(function() {
	'use strict';

	angular.module('StSApp', ['ui.router', 'uiRouterStyles', 'btford.socket-io'])
		.config(config);

	function config($urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');
	}
})();
