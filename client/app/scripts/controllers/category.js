(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:CategoryCtrl
   * @name clientApp.directive:productList
   * @description
   * # CategoryCtrl
   * Controller of the clientApp
   * directive of the clientApp
   */
  angular.module('clientApp')
    .controller('CategoryCtrl', CategoryCtrl)
    .directive('productList', productList);

  function CategoryCtrl($localStorage) {
    // get catgory name from selected category
    this.name = $localStorage.categoryName;
  }

  function productList($localStorage) {
    return {
      restrict: 'E',
      controller: function($scope) {

        // get products associated with that selected category
        $scope.products = $localStorage.categoryProducts;

        // get product slug click event function
        $scope.productSlug = function(slug) {

          // iterate through category product list
          angular.forEach($scope.products, function(product) {

            // if category slug matches product slug
            if (slug === product.slug) {

              // then store product cookies
              $localStorage.product = product;
            }
          });
        }
      }
    };
  }
})();
