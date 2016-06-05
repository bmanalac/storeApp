(function() {
  'use strict';

  const express = require('express');
  const json = require('./dummy.json');

  const router = express.Router();

  router.get('/json', function(req, res) {
    res.send(json);
  });

  module.exports = router;

})();
