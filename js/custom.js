(function ($) {
  "use strict";

  /* --- NAVBAR SCROLL EFFECT --- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  /* --- NAVBAR COLLAPSE ON LINK CLICK --- */
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  /* --- HAMBURGER: close when clicking outside --- */
  $(document).on('click touchstart', function (e) {
    var $navbar = $('.navbar');
    var $toggler = $('.navbar-toggler');
    // If navbar is expanded and click is outside navbar
    if ($navbar.find('.navbar-collapse').hasClass('show')) {
      if (!$navbar.is(e.target) && $navbar.has(e.target).length === 0) {
        $toggler.trigger('click');
      }
    }
  });

  /* --- SMOOTH SCROLL --- */
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    if (elWrapped.length) {
      $('body,html').animate({ scrollTop: elWrapped.offset().top - 80 }, 400);
    }
    return false;
  });

  /* --- OWL CAROUSEL: hero = 1 item; other carousels = multiple --- */
  if ($('.hero-section .owl-carousel').length) {
    $('.hero-section .owl-carousel').owlCarousel({
      center: true,
      loop: true,
      items: 1,
      margin: 24,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      dots: true,
      nav: false
    });
  }

  if ($('.other-nav-carousel').length) {
    $('.other-nav-carousel').owlCarousel({
      center: true,
      loop: true,
      margin: 24,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsiveClass: true,
      responsive: {
        0:    { items: 1 },
        576:  { items: 2 },
        992:  { items: 3 },
        1200: { items: 4 }
      }
    });
  }

  /* --- ANIMATED COUNTERS --- */
  var counted = false;

  function runCounters() {
    if (counted) return;
    counted = true;
    $('[data-count]').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('count'));
      var suffix = $el.data('suffix') || '';
      $({ n: 0 }).animate({ n: target }, {
        duration: 2200,
        easing: 'swing',
        step: function () { $el.text(Math.floor(this.n).toLocaleString() + suffix); },
        complete: function () { $el.text(target.toLocaleString() + suffix); }
      });
    });
  }

  $(window).on('scroll', function () {
    var statsTop = $('.hero-stats').length ? $('.hero-stats').offset().top : 0;
    if ($(this).scrollTop() + $(window).height() > statsTop - 100) {
      runCounters();
    }
  });
  setTimeout(runCounters, 1200);

  /* --- FILTER PILLS: in-page show/hide for projects & blog --- */
  $(document).on('click', '.filter-pill[data-filter]', function () {
    var $pill = $(this);
    var filter = $pill.data('filter');

    // Update active state
    $pill.closest('.d-flex, .gap-3').find('.filter-pill').removeClass('active');
    $pill.addClass('active');

    // Determine which items to filter
    var $items = $('.project-col').length ? $('.project-col') : $('.blog-col');

    if (filter === 'all') {
      $items.each(function () {
        $(this).css({ opacity: 0, transform: 'scale(0.95)' });
        $(this).show().animate({ opacity: 1 }, 250);
        $(this)[0].style.transform = 'scale(1)';
      });
    } else {
      $items.each(function () {
        var cat = $(this).data('cat');
        if (cat === filter) {
          $(this).css({ opacity: 0 });
          $(this).show().animate({ opacity: 1 }, 250);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });

  /* --- SUBSCRIBE BUTTON: EmailJS integration --- */
  $('.subscribe-wrap button').on('click', function (e) {
    e.preventDefault();
    var $button = $(this);
    var $input = $button.siblings('.form-control, input[type="email"]');
    var subscriberEmail = $input.val().trim();
    
    // Validate email
    if (!subscriberEmail || subscriberEmail.indexOf('@') === -1) {
      $input.css('border-color', 'var(--gold)');
      $input.focus();
      setTimeout(function () { $input.css('border-color', ''); }, 2000);
      return;
    }
    
    // Disable button to prevent multiple submissions
    $button.prop('disabled', true);
    var originalText = $button.text();
    $button.text('Sending...');
    
    // Send email via EmailJS
    emailjs.send('service_7buxqqw', 'template_otd533s', {
      subscriber_email: subscriberEmail,
      to_email: 'blessing.gos26@gmail.com'
    }).then(function (response) {
      $button.text('✓ Subscribed!');
      $input.val('');
      console.log('Email sent successfully:', response);
      
      // Reset button after 3 seconds
      setTimeout(function () {
        $button.text(originalText).prop('disabled', false);
        $input.prop('disabled', false);
      }, 3000);
    }, function (error) {
      console.error('Failed to send email:', error);
      $button.text('Error - Try Again').css('background-color', '#dc3545');
      
      // Reset button after 3 seconds
      setTimeout(function () {
        $button.text(originalText).css('background-color', '').prop('disabled', false);
      }, 3000);
    });
  });

  /* --- TICKER PAUSE ON HOVER --- */
  $('.ticker-text').on('mouseenter', function () {
    $(this).css('animation-play-state', 'paused');
  }).on('mouseleave', function () {
    $(this).css('animation-play-state', 'running');
  });

})(window.jQuery);
