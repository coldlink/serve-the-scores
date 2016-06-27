//initialise the application
(function() {
	'use strict';

	angular.module('StSApp', ['ui.router', 'uiRouterStyles'])
		.config(config);

	function config($urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');

		//no hashbangs
		$locationProvider.html5Mode(true);
	}
})();
