(function () {
  'use strict';

  angular.module('StSApp')
    .config(config);

    function config($stateProvider) {
      $stateProvider
      .state('boards', {
        url: '/boards/main',
        templateUrl: 'boards/main/main.board.html',
        controller: 'MainBoardCtrl as board',
        data: {
          css: 'boards/main/main.board.css'
        }
      })
      .state('boards.main', {
        url: '/boards/main',
        templateUrl: 'boards/main/main.board.html',
        controller: 'MainBoardCtrl as board',
        data: {
          css: 'boards/main/main.board.css'
        }
      });
    }
})();
