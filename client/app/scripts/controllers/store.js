(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.categoryList: controller
   * @description
   * # StoreCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .directive('categoryList', categoryList);

  function categoryList($localStorage) {
    return {
      restrict: 'E',
      controller: function($scope) {
        // get categories data from cookies
        $scope.categories = $localStorage.categories;

        /**
         * ngdoc function
         * @name category
         * @description
         * angular click function: gets category title value
         * @param {string} title - category title value
         */
        $scope.getCategory = function(title) {
          // // get category title when selected
          // // then pass in localStorage variable
          $localStorage.categoryName = title;

          // call categoryMatch::filter
          categoryMatch(title, $localStorage);
        };
      }
    };
  }

  /**
   * @ngdoc function
   * @name categoryMatch
   * @description
   * category match products function
   * @param {string} title - category title:value
   * @param {object} products - shop products data
   * @param {object} $localStorage - store data in cookies
   */
  function categoryMatch(title, $localStorage) {
    // store products data
    let products = $localStorage.products;

    // create empty array to hold data later
    let product = [];

    // loop through all products category title
    angular.forEach(products, function(item) {
      // check if current category title matches
      // product category title if so...
      if (title === item.category.value) {
        // then push data to empty array
        product.push(item);
      }
    });

    // then store data to new variable
    // and store in localStorage
    $localStorage.categoryProducts = product;
  }
})();
