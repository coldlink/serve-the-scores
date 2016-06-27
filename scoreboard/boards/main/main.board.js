(function () {
  'use strict';

  angular.module('StSApp')
    .config(config);

    function config($stateProvider) {
      $stateProvider
      .state('boardsMain', {
        url: '/boards/main',
        templateUrl: 'boards/main/main.board.html',
        controller: 'MainBoardCtrl as board',
        data: {
          css: 'boards/main/main.board.css'
        }
      });
    }
})();
