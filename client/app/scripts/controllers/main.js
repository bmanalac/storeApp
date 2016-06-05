(function() {
  'use strict';

  function MainCtrl() {
    this.title = 'main';
  }
  /**
   * @ngdoc function
   * @name clientApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('MainCtrl', MainCtrl);
})();
