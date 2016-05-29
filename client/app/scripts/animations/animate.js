(function() {

  function signupShow() {
    // Define overlay classes
    var active = 'active';

    // overlay && signup nav:btn class animation that will turn background
    // on/off when click event triggers
    $('#signup-animate').on('click', function() {
      $('.overlay, .signup-container').toggleClass(active);
    });
    // This will turn the background off when we click the
    // background if it's turned on
    $('.overlay').on('click', function() {
      if ($('.overlay, .signup-container').hasClass(active)) {
        $('.overlay, .signup-container').removeClass(active);
      }
    });
  }

  signupShow();

})();
