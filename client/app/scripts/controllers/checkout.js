(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:CheckoutCtrl
   * @description
   * # CheckoutCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('CheckoutCtrl', function($rootScope, $localStorage, $http) {
      let checkout = this;

      checkout.data = {
        bill: {},
        ship: {},
        ship_bill: 0,
        notes: '',
        shipping: '',
        gateway: ''
      };

      // get localStorage cart items ready for checkout page
      checkout.cart = $localStorage.cart;

      // http get checkout Address.fields[customer, address, payment, etc...]
      $http.get('/moltin/api/checkout/fields')
        .then(function(fields) {
          checkout.fields = fields.data;

          checkout.check = function(data) {
            if (data !== 'customer' && data !== 'save_as' && data !== 'company' && data !== 'instructions') {
              return true;
            }
          };
        });

      // $scope.options = options;

      checkout.createOrder = function() {
        console.log('proceed');
        // moltin.Cart.Complete({
        //   customer: '947445503480562327', //guest customer for now
        //   shipping: $scope.data.shipping,
        //   gateway: $scope.data.gateway,
        //   bill_to: $scope.data.bill,
        //   ship_to: $scope.data.ship_bill ? 'bill_to' : $scope.data.ship
        // }, function(response) {
        //   $rootScope.order = response;
        //   $rootScope.$apply(function() {
        //     $location.path('/payment');
        //   });
        // });
      };
    });

})();
