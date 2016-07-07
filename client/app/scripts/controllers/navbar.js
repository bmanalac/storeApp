(function() {
  'use strict';

  angular
    .module('clientApp')
    .directive('appNavbar', navbarDirective);

  function navbarDirective() {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E'
    };
  }
})();
