/*!
 * shake-it
 * @author Chuck Holbrook chuck@streetdeck.com
 * @description An AngularJS directive for shaking things, like when a form fails validation
 * See LICENSE in this repository for license information
 */


'use strict';


(function () {
    'use strict';

    //Elements are registered when they use the shake-it attribute / directive automatically
    var _elementsToShake = {};

    //Used to create unique names if one is not given for shake element
    var _elementCount = 0;

    /**
     * @ngdoc function
     * @author Chuck Holbrook chuck@streetdeck.com
     * @description The shake it delegate is used to shake a particular element that has been attributed with the
     * shake-it directive
     */
    function ShakeItDelegateFn($animate, $injector) {

        var ShakeItDelegate = {};

        function shakeElement(element) {
            if (element) {
                var $ionicScrollDelegate = $injector.get('$ionicScrollDelegate');
                if ($ionicScrollDelegate) {
                    var $ionicPosition = $injector.get('$ionicPosition');
                    var position = $ionicPosition.position(element);
                    var scrollPosition = $ionicScrollDelegate.getScrollPosition();
                    if (scrollPosition) {
                        $ionicScrollDelegate.scrollTo(0, position.top + scrollPosition.top);
                    }
                }


                $animate.addClass(element, 'shake').then(function () {
                    $animate.removeClass(element, 'shake');
                });
            }
        }

        /**
         * Shake the specified element if the name is not given all registered elements are shaken
         */
        ShakeItDelegate.shakeIt = function(name){
            for (var elementName in _elementsToShake) {
                if (!name || elementName === name) {
                    shakeElement(_elementsToShake[elementName]);
                    return
                }
            }
        };

        return ShakeItDelegate;
    }
    angular.module('shakeit', []).factory('ShakeItDelegate', ShakeItDelegateFn);


    /**
     * Shakes the specified element whenever the value of the attribute is changed to a truthy value
     */
    function shakeItDirectiveFn() {
        return {
            restrict: 'A',

            link: function ($scope, $element, $attr) {
                _elementCount++;
                var name = $attr.shakeIt || 'shake' + _elementCount;
                _elementsToShake[name] = $element;


                $scope.$on('$destroy', function () {
                    delete _elementsToShake[name];
                });
            }
        };
    }

    angular.module('shakeit').directive('shakeIt',  shakeItDirectiveFn);

})();


