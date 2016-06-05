(function() {
  'use strict';

  function navbarDirective() {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E'
    };
  }

  angular
    .module('clientApp')
    .directive('navbarApp', navbarDirective);
})();
