//initialise the application
(function () {
  'use strict';

  angular.module('StSApp', ['ui.router'])
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
  }
})();
