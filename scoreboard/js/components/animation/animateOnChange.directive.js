(function() {
	'use strict';

	angular.module('StSApp')
		.directive('animateOnChange', animateOnChange);

	function animateOnChange($timeout, $animate) {
		return function(scope, elem, attr) {
			scope.$watch(attr.animateOnChange, () => {
        $timeout(() => {
          $animate.addClass(elem, 'flip');
          $animate.addClass(elem, 'animated');
          // $timeout(() => {
          //   $animate.removeClass(elem, 'animated');
          //   $animate.removeClass(elem, 'flip');
          // }, 1000);
          console.log('here');
        }, 2000);
			});
		};
	}
})();
