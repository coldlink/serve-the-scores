(function () {
  'use strict';

  angular.module('StSApp')
    .factory('$socket', function (socketFactory) {
      let socket = socketFactory();
      socket.forward('data');
      return socket;
    });
})();
