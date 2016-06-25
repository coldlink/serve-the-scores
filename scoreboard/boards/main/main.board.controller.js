(function () {
  'use strict';

  angular.module('StSApp')
    .controller('MainBoardCtrl', MainBoardCtrl);

    function MainBoardCtrl() {
      let vm = this;

      vm.message = 'MAIN BOARD';
    }
})();
