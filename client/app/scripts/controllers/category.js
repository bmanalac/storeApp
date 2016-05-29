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
    .controller('CategoryCtrl', function($rootScope, $localStorage, $http) {
      let category = this;

      // get catgory name from selected category
      category.catData = $localStorage.categoryName;

      // get products associated with that selected category
      category.products = $localStorage.catProducts;

      // get product slug click event function
      category.productSlug = function(slug) {

        // iterate through category product list
        angular.forEach(category.products, function(item) {

          // if category slug matches product slug
          if (slug === item.slug) {

            // then store product to rootScope
            // to pass in product.js
            $rootScope.product = item;
          }
        });
      };
    });

})();
