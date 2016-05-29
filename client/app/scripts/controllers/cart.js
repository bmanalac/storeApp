(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:CartCtrl
   * @description
   * # CartCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('CartCtrl', function($rootScope, $localStorage) {
      var cart = this;

      // if localStorage === empty then store rootScope data
      // in localStorage to save our items when page is refreshed
      if ($localStorage.cart === undefined) {
        cart.items = $localStorage.cart = $rootScope.cart;

        // otherwise...if localStorage !== empty then,
        // persist grabbing data in localStorage whenever
        // an item is stored in our cart
      } else {
        cart.items = $localStorage.cart;
      }

      // Get object path to tax(s) before discount(s) are added
      cart.total = cart.items.totals.pre_discount.formatted;

      // function add(price, duration) {
      //   var value = 0,
      //     counter = setInterval(function() {
      //       if (value++ == price - 1) {
      //         clearInterval(counter);
      //       }
      //       console.log(value);
      //     }, duration);
      // }
    });

})();
