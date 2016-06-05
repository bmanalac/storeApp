(function() {

  'use strict';

  let express = require('express');
  let Promise = require('bluebird');
  let moltin = require('./config').moltin;

  let router = express.Router();

  // moltinAuth function that will be
  // passed in to start chaining our promises
  // so we can call moltin api functions and methods
  let moltinAuth = function() {

    // start new promise(resolve, reject) functions
    return new Promise(function(resolve, reject) {

      // moltin Authenticate api call
      moltin.Authenticate(function(moltin) {

        // resolve moltin Authentication
        resolve(moltin);
      });
    });
  };

  // categories function that will handle
  // all our category logic, data, api calls...
  let categories = function() {

    // start new promise(resolve, reject) functions
    return new Promise(function(resolve, reject) {

      // moltin category api call, get all categories
      moltin.Category.List(null, function(categories) {

        // resolve our list data
        resolve(categories);

        // then we'll pass our all categories list data to client
        router.get('/moltin/api/categories', function(req, res) {

          // send our categories list data to client
          res.send(categories);
        });
      });
    });
  };

  // products function that will handle
  // all our products logic, data, api calls...
  let products = function() {

    // start new promise(resolve, reject) functions
    return new Promise(function(resolve, reject) {

      // moltin api call all products
      moltin.Product.List(null, function(products) {

        // resolve product list data
        resolve(products);

        // pass our alll products data to client
        router.get('/moltin/api/products', function(req, res) {

          // send product data to client
          res.send(products);
        });
      });
    });
  };


  // cart function that will handle
  // all our cart data logic
  let cart = function() {
    return new Promise(function(resolve, reject) {
      moltin.Cart.Contents(function(cart) {

        // resolve cart items data
        resolve(cart);

        // pass our cart data to :domain/moltin/api/cart
        router.get('/moltin/api/cart', function(req, res) {
          res.send(cart);
        });
      });

      // get data from client to pass in function
      router.post('/', function(req, res) {

        // object{id: :id}
        let item = req.body.id;

        moltin.Cart.Insert(item, 1, null, function() {

          // Get new cart contents
          moltin.Cart.Contents(function(cart) {

            // success handler: pass cart data to client
            res.send(cart);
          });
        });
      });
    });
  };

  // checkout function that will handle
  // all our checkout data logic
  let checkout = function() {
    return new Promise(function(resolve, reject) {
      moltin.Address.Fields(null, null, function(fields) {
        resolve(fields);
        router.get('/moltin/api/checkout/fields', function(req, res) {
          res.send(fields);
        })
      });
      // moltin.Cart.Checkout(function(checkout) {
      //   resolve(checkout);
      //   console.log(checkout);
      //
      //   router.get('/moltin/api/checkout', function(req, res) {
      //     res.send(checkout);
      //   });
      // });
    });
  };

  // Asynchronous callbacks to moltin api(s)
  moltinAuth()
    .then(categories)
    .then(products)
    .then(cart)
    .then(checkout)
    // catch block for chaining down error(s)
    .catch(function(error) {
      throw error;
    });

  // export router modules to index
  module.exports = router;

})();
