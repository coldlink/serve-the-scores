(function() {
	'use strict';

	angular.module('StSApp')
		.directive('animateOnChange', animateOnChange);

	function animateOnChange($timeout, $animate, ANIMATION_TIMEOUT) {
		return function(scope, elem, attr) {
			scope.$watch(attr.animateOnChange, () => {
				if (scope.loaded === 1) {
					/*Play out animation on change*/
					$animate.addClass(elem, 'animated ' + attr.animationOut);

					/*Remove out animation class after play, add in variable, and remove in variable after play*/
					$timeout(() => {
						$animate.removeClass(elem, 'animated ' + attr.animationOut);
						$animate.addClass(elem, 'animated ' + attr.animationIn)
						$timeout(() => {
							$animate.removeClass(elem, 'animated ' + attr.animationIn);
						}, ANIMATION_TIMEOUT);
					}, ANIMATION_TIMEOUT);
				}
			});
		};
	}
})();
