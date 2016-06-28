(function () {
  'use strict';

  angular.module('StSApp')
    .directive('onLoadAnimation', onLoadAnimation);

    function onLoadAnimation($timeout, $animate, ANIMATION_TIMEOUT) {
      return function (scope, elem, attr) {
        $timeout(() => {
          $animate.removeClass(elem, 'animated ' + attr.animationIn);
        }, ANIMATION_TIMEOUT);
      };
    }
})();
