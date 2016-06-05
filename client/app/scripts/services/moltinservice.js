(function() {
  'use strict';

  // moltin http call function to our
  // server returning data to the client
  var moltinService = {
    getCart: function($http) {
      return $http.get('/moltin/api/cart');
    },
    getCategories: function($http) {
      return $http.get('/moltin/api/categories');
    },
    getProducts: function($http) {
      return $http.get('/moltin/api/products');
    },
    postProducts: function($http, data) {
      return $http.post('/', data);
    }
  };
  /**
   * @ngdoc service
   * @name clientApp.moltinService
   * @description
   * # moltinService
   * Service in the clientApp.
   */
  angular.module('clientApp')
    .service('moltinService', moltinService);
})();
