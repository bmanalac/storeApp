(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name ProductCtrl
   * @description main controller function
   * @param {Object} moltinService - this.method().then(callback)
   * @param {Object} $rootScope - get parent scope data
   * @param {object} $localStorage - get/cookie parent scope data
   * @param {function} $timeout - delay(function, duration)
   */
  function ProductCtrl(moltinService, $rootScope, $localStorage, $timeout) {
    var product = this;

    /**
     * @ngdoc function
     * @name productData
     * @description
     * Deconstruct product data: create new Product
     * and check to see if stock is not empty
     * @return {true || false}
     */
    function productData() {
      // get product data from category product list
      var item = $localStorage.product;

      // add to cart status is unactive
      product.addStatus = null;

      // deconstruct product data into new object
      product.info = {
        id: item.id,
        title: item.title,
        price: item.price.value,
        stock: 'stock: ' + item.stock_level,
        image: item.images[0].url.http,
        description: item.description,
        specs: {
          width: 'width: ' + item.width + ' in',
          height: 'height: ' + item.height + ' in',
          weight: 'weight: ' + item.weight + ' in'
        }
      };
      // stock level data logic
      product.stock = function() {
        if (item.stock_level > 0) {
          return true;
        } else {
          this.info.stock = 'Sold Out!';
          return false;
        }
      };
    }

    // call our product filter function
    productData();

    /**
     * @ngdoc function
     * @name this.addCart
     * @desc Add to cart click event
     * @param {function} id - get product id then pass in object width id
     */
    product.addCart = function(id) {
      // Set object data
      var item = {
        id: id
      };

      // add to cart status change click event
      product.addStatus = 'Success!!!';

      // moltinService post data to server
      // to get back new cart data:
      // includes products in cart contents
      moltinService.postProducts(item)
        .then(function(response) {
          // pass data to localStorage
          // when post data returns response data
          $localStorage.cart = response.data;
        });

      // update cart status notice to original state
      $timeout(function() {
        product.addStatus = null;
      }, 1000);
    };
  }
  /**
   * @ngdoc function
   * @name clientApp.controller:ProductCtrl
   * @description
   * # ProductCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('ProductCtrl', ProductCtrl);
})();
