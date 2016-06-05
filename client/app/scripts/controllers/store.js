(function() {
  'use strict';

  function StoreCtrl($localStorage) {
    // get categories data from cookies
    this.categories = $localStorage.categories;

    // get products data from cookies
    this.products = $localStorage.products;

    // get category name click event to pass
    // data in variable to localStorage
    this.title = function(title) {

      // get category title when selected
      // then pass in localStorage variable
      $localStorage.categoryName = title;
    };

    /**
     * @ngdoc function
     * @name categoryMatch
     * @description
     * category match products function
     * @param {string} title - category title:value
     * @param {object} products - shop products data
     * @param {object} $localStorage - store data in cookies
     */
    categoryMatch(this.title, this.products, $localStorage);
  }

  // category title match function
  function categoryMatch(title, products, $localStorage) {
    // create empty array to hold data later
    var prod = [];

    // loop through all products category title
    angular.forEach(products, function(item) {
      // check if current category title matches
      // product category title if so...
      if (title === item.category.value) {
        // then push data to empty array
        prod.push(item);
      }
    });
    // then store data to new variable
    // and store in localStorage
    $localStorage.categoryProducts = prod;
  }

  /**
   * @ngdoc function
   * @name clientApp.controller:StoreCtrl
   * @description
   * # StoreCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('StoreCtrl', StoreCtrl);
})();
