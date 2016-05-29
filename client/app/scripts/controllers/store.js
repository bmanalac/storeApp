(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:StoreCtrl
   * @description
   * # StoreCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('StoreCtrl', function($rootScope, $localStorage, $http) {
      let store = this;
      store.title = 'Categories';

      // store all categories data from app.run function in scope variable
      store.categories = $localStorage.categories;

      // get category ID function to pass in server api
      store.catTitle = function(name) {
        // get category name when selected then pass in localStorage
        $localStorage.categoryName = name;

        // category title match with products category title function
        function catMatch() {
          // get products from app module
          let products = $localStorage.products;
          // create empty array to hold data later
          let prod = [];

          // iterate through all products category title
          angular.forEach(products, function(item) {
            // check if current category title matches
            // product category title if so...
            if (name === item.category.value) {
              // push data to empty array
              prod.push(item);
            }
          });
          // then store data to new variable for views
          $localStorage.catProducts = prod;
        };

        // call our category match function
        catMatch();

        // // http post category ID data to server
        // $http.post('/moltin/api/categories/id', category)
        //   .then(function(response) {
        //
        //     // store our data in storage to pass in to category.js
        //     $localStorage.categoryData = response.data;
        //
        //     // return category:ID to next then function
        //     // that will get all products that are stored
        //     // in this specified category
        //     return response;
        //   });
      };
    });

})();
