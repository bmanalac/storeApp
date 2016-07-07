(function() {

  'use strict';

  /**
   * The Index of Routes
   */

  module.exports = function(app) {

    // app.use('/', require('./routes/signup'));
    // app.use('/', require('./routes/users'));
    // app.use('/', require('./services/moltin'));
    app.use('/', require('./services/test'));
  };

})();
