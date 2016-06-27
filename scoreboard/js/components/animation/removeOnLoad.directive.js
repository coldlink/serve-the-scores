(function () {
  'use strict';

  angular.module('StSApp')
    .directive('removeOnLoad', removeOnLoad);

    function removeOnLoad($timeout, $animate) {
      return function (scope, elem, attr) {
        $timeout(() => {
          console.log('remove');
          $animate.removeClass(elem, 'animated');
          $animate.removeClass(elem, attr.removeOnLoadClass);
        }, 1000);
      };
    }
})();
