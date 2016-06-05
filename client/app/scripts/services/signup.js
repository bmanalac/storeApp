(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name signup
   * @description
   * main directive function
   */
  function signupDirective($http) {
    return {
      templateUrl: 'views/signup.html',
      restrict: 'E',
      link: function(element) {
        // Here we're creating some local references
        // so that we don't have to type $scope every
        // damn time
        var signup = this;
        var user;

        // Here we're creating a scope for our Signup page.
        // This will hold our data and methods for this page.
        signup = {};

        // In our signup.html, we'll be using the ng-model
        // attribute to populate this object.
        signup.user = user = {};

        // This is our method that will post to our server.
        signup.submit = function() {

          // make sure all fields are filled out...
          if (!user.firstname ||
            !user.lastname ||
            !user.email ||
            !user.password1 ||
            !user.password2
          ) {
            signup.alert = 'Please fill out all form fields.';
            return false;
          }

          // make sure the passwords match
          if (user.password1 !== user.password2) {
            signup.alert = 'Your passwords must match.';
            return false;
          }

          // query our #alert element
          var querySelector = angular.element(element[0].querySelector('#alert'));

          // Make the request to the server
          // .then handle success and error callbacks asynchronously
          $http({
            method: 'POST',
            url: '/',
            data: user
          }).then(
            // Success callback passes response message to signup form
            function success(response) {

              // check if our element hasClass
              var ele = querySelector.hasClass('alert-danger');

              // If element does then...
              if (ele) {

                // removClass and replace with new class
                querySelector.removeClass('alert-danger');
                querySelector.addClass('alert-success');
              }

              // our json response in server is recognized as
              // the data parameter here
              signup.alert = response.data.message;
            },
            // Error callback passes response message to signup form
            function error(response) {

              // check if our element hasClass
              var ele = querySelector.hasClass('alert-success');

              // If element does then...
              if (ele) {

                // removClass and replace with new class
                querySelector.removeClass('alert-success');
                querySelector.addClass('alert-danger');
              }

              // our json response in server is recognized as
              // the data parameter here
              signup.alert = response.data.message;
            });
        };
      }
    };
  }

  /**
   * @ngdoc directive
   * @name clientApp.directive:signup
   * @description
   * # signup
   * signup directive to clientApp
   */
  angular.module('clientApp')
    .directive('signupApp', signupDirective);
})();
