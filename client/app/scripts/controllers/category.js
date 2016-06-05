(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:CategoryCtrl
   * @description
   * # CategoryCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('CategoryCtrl', function($rootScope, $localStorage) {
      var category = this;

      // get catgory name from selected category
      category.name = $localStorage.categoryName;

      // get products associated with that selected category
      category.products = $localStorage.categoryProducts;

      // get product slug click event function
      category.productSlug = function(slug) {

        // iterate through category product list
        angular.forEach(category.products, function(item) {

          // if category slug matches product slug
          if (slug === item.slug) {

            // then store product to rootScope
            // to pass in product.js
            $localStorage.product = item;
          }
        });
      };
    });

})();
