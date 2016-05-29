(function() {

  'use strict';

  /**
   * @ngdoc overview
   * @name clientApp
   * @description
   * # clientApp
   *
   * Main module of the application.
   */
  angular
    .module('clientApp', [
      // 'ui.router',
      'ngRoute',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'ngStorage'
    ])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .when('/store', {
          templateUrl: 'views/store.html',
          controller: 'StoreCtrl',
          controllerAs: 'store'
        })
        .when('/category/:id', {
          templateUrl: 'views/category.html',
          controller: 'CategoryCtrl',
          controllerAs: 'category'
        })
        .when('/product/:id', {
          templateUrl: 'views/product.html',
          controller: 'ProductCtrl',
          controllerAs: 'product'
        })
        .when('/cart', {
          templateUrl: 'views/cart.html',
          controller: 'CartCtrl',
          controllerAs: 'cart'
        })
        .when('/checkout', {
          templateUrl: 'views/checkout.html',
          controller: 'CheckoutCtrl',
          controllerAs: 'checkout'
            // resolve: {
            //   // Inject options into our dependency controller
            //   options: function($q, MoltinAuth) {
            //     let deferred = $q.defer();
            //
            //     // Authenticate moltin then...
            //     MoltinAuth.then(function(moltin) {
            //
            //       // Get checkout options before converting cart to order
            //       // checkout options will contain the following data:
            //       //  1. cart contents & cart value(s)
            //       //  2. applicable shipping methods
            //       //  3. address associated with the customer(s)
            //       //  4. enable payment methods
            //       moltin.Cart.Checkout(function(options) {
            //         deferred.resolve(options);
            //       });
            //     });
            //
            //     // return our checkout promise
            //     return deferred.promise;
            //   },
            //   Inject fields into our dependencies controller
            //   fields: function($q, MoltinAuth) {
            //     let deferred = $q.defer();
            //
            //     // Authenticate moltin then...
            //     MoltinAuth.then(function(moltin) {
            //
            //       // Get address fields that we can specify into our controller
            //       moltin.Address.Fields(null, null, function(fields) {
            //
            //         // resolve our fields when caught
            //         deferred.resolve(fields);
            //       });
            //     });
            //
            //     // return our address fields promise
            //     return deferred.promise;
            //   }
            // }
        })
        .otherwise({
          redirectTo: '/'
        });
      // This will always run even if our resolves get rejected
    }).run(function($http, $templateCache, $rootScope, $localStorage) {

      // http get cart data
      $http.get('/moltin/api/cart')
        // then we'll pass our data in rootScope
        .then(function(items) {
          // we will pass in our data into rootScope,
          // if localStorage === empty otherwise don't
          // get api data if storage !== empty
          if ($localStorage.cart === undefined) {
            $rootScope.cart = items.data;
          }
        });

      // http get our categories list data
      $http.get('/moltin/api/categories')
        // then we'll pass our data to our scope
        .then(function(categories) {
          // store data in scope variable
          $localStorage.categories = categories.data;
        });

      // http get all products data
      $http.get('/moltin/api/products')
        .then(function(products) {
          $localStorage.products = products.data;
        });

      // templateCache function
      function cache() {
        // store directory names in let
        let nameArray = ['about', 'cart', 'category', 'checkout', 'contact', 'main', 'product', 'signup', 'store'];

        // cache all dir:templates loop
        for (var i = 0; i < nameArray.length; i++) {
          $http.get('../views/' + nameArray[i] + '.html', {
            cache: $templateCache
          });
        }
      }

      // call cache template function
      cache();

    });

})();
