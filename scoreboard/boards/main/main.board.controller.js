(function () {
  'use strict';

  angular.module('StSApp')
    .controller('MainBoardCtrl', MainBoardCtrl);

    function MainBoardCtrl() {
      let board = this;

      board.p1name = 'Player 1';
      board.p2name = 'Player 2';
      board.p1score = 0;
      board.p2score = 0;
      board.eventLeft = 'Hello';
      board.eventRight = 'World';
    }
})();
