(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name clientApp
   * @description
   * # clientApp
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
          templateUrl: 'views/main.html'
        })
        .when('/about', {
          templateUrl: 'views/about.html'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html'
        })
        .when('/store', {
          templateUrl: 'views/store.html'
        })
        .when('/category/:slug', {
          templateUrl: 'views/category.html'
        })
        .when('/product/:slug', {
          templateUrl: 'views/product.html'
        })
        .when('/checkout', {
          templateUrl: 'views/checkout.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .run(function(moltinService, $rootScope, $localStorage) {
      // moltinService.get[Cart, Categories, Products] methods
      // then pass in a callback function to use our data
      moltinService
        .getCart()
        .then(function(cart) {
          // we will pass in our data into rootScope,
          // if localStorage === empty otherwise don't
          // get api data if storage !== empty
          if ($localStorage.cart === undefined) {
            $rootScope.cart = cart.data;
          }
        });
      moltinService
        .getCategories()
        .then(function(categories) {
          $localStorage.categories = categories.data;
        });
      moltinService
        .getProducts()
        .then(function(products) {
          $localStorage.products = products.data;
        });
    });
})();
