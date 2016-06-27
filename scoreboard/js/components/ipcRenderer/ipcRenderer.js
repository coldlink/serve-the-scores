(function () {
  'use strict';
  angular.module('StSApp')
    .run(run);

  // function run($ipc) {
  //   $ipc.on('redirect', function (e, arg) {
  //     $state.go(arg);
  //   });
  //
  //   $ipc.on('settings', function (e, arg) {
  //     $localStorage.set('settings', arg);
  //   });
  // }
})();
