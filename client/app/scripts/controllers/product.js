(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:ProductCtrl
   * @description
   * # ProductCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('ProductCtrl', function($rootScope, $localStorage, $http, $timeout) {
      let product = this;

      // product filter function
      // filter out specific product data
      // to post to views
      function productFilter() {
        // get product data from category product list
        let item = $rootScope.product;
        // deconstruct product data into new object
        product.info = {
            id: item.id,
            title: item.title,
            price: item.price.value,
            stock: `stock: ${item.stock_level}`,
            image: item.images[0].url.http,
            description: item.description,
            specs: {
              width: `width: ${item.width} in`,
              height: `height: ${item.height} in`,
              weight: `weight: ${item.weight} in`
            }
          }
          // stock level data logic
        product.stock = function() {
          if (item.stock_level > 0) {
            return true;
          } else {
            return false;
          }
        }
      };

      // call our product filter function
      productFilter();

      // add to cart status is unactive
      product.addStatus = null;

      // Add to cart function
      product.addCart = function(id) {

        // Set object data
        let item = {
          id: id
        };

        product.addStatus = 'Success!!!';

        // http post data to server to get back new cart
        $http.post('/', item)
          .then(function(response) {
            // pass data to localStorage:globally
            // when post data returns response data
            $localStorage.cart = response.data;
          });

        $timeout(function() {
          product.addStatus = null;
        }, 1000);

      };
    });

})();
