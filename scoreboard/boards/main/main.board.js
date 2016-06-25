(function () {
  'use strict';

  angular.module('StSApp')
    .config(config);

    function config($stateProvider) {
      $stateProvider
      .state('boards', {
        url: '/boards/main',
        templateUrl: 'boards/main/main.board.html',
        controller: 'MainBoardCtrl as vm'
      })
      .state('boards.main', {
        url: '/boards/main',
        templateUrl: 'boards/main/main.board.html',
        controller: 'MainBoardCtrl as vm'
      });
    }
})();
