(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name clientApp.directive:cart
   * @description
   * # cart
   */
  angular.module('clientApp')
    .directive('appCart', cartDirective);

  function cartDirective($rootScope, $localStorage) {
    return {
      templateUrl: 'views/cart.html',
      restrict: 'E',
      link: function(scope) {

        // get cart data function
        function getCart() {
          // if localStorage === empty then store rootScope data
          // in localStorage to save our items when page is refreshed
          if ($localStorage.cart === undefined) {
            scope.items = $localStorage.cart = $rootScope.cart;

            // otherwise...if localStorage !== empty,
            // persist storing data in localStorage
            // whenever an item is stored in our cart
          } else {
            scope.items = $localStorage.cart;
          }

          // get path to without_tax(s) of cart items: store in single variable
          scope.total = scope.items.totals.pre_discount.formatted.without_tax;
        }

        // instantiate data function: get cart data
        getCart();
        // function add(price, duration) {
        //   var value = 0,
        //     counter = setInterval(function() {
        //       if (value++ == price - 1) {
        //         clearInterval(counter);
        //       }
        //       console.log(value);
        //     }, duration);
        // }
      }
    };
  }
})();
