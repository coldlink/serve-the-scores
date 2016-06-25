(function () {
  'use strict';

  angular.module('StSApp')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl as vm'
      });
  }
})();
