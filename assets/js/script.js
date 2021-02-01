/**
 * This is script for index page
 */
let old_youtube;
$(window).on("load", function () {
  if ($(".movie-youtube")) {
    old_youtube = $(".movie-youtube").attr("src");
  }
});
$(document).ready(function () {
  // Wow init
  new WOW().init();
  $(document).on("click", ".hamburger", function () {
    $(this).toggleClass("active");
    $(".header").toggleClass("active");
    if ($(this).hasClass("active")) {
      $("body").append('<div class="overlay"></div>');
    } else {
      $("body .overlay").remove();
    }
  });

  //viewport check
  $.fn.isInViewport = function () {
    if ($(this).length > 0) {
      let elementTop = $(this).offset().top;
      let elementBottom = elementTop + $(this).outerHeight();

      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
  };

  //scroll effect
  var lastScrollTop = 0;
  $(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop && st > $(".header").outerHeight()) {
      // downscroll code
      if (!$(".header").hasClass("active")) {
        $(".header").addClass("is-hidden");
      }
    } else {
      // upscroll code
      $(".header").removeClass("is-hidden");
    }
    if ($(".article-content__statistics").isInViewport()) {
      $(".article-content__statistics").addClass("active");
    } else {
      $(".article-content__statistics").removeClass("active");
    }
    lastScrollTop = st;
  });

  //filter select
  $(document).on("click", ".artint-filter__item", function () {
    $(this).addClass("filtered");
  });
  $(document).on("click", ".filter-cancel", function (e) {
    e.stopPropagation();
    $(this).parent().removeClass("filtered");
  });

  //podcasts play movie
  $(document).on(
    "click",
    ".podcast-carousel__details .start-play",
    { passive: true },
    function (e) {
      $(this)
        .closest(".podcast-carousel__container")
        .find(".podcast-carousel__single")
        .removeClass("active");
      $(this).closest(".podcast-carousel__single").addClass("active");
      if ($(".movie-youtube")) {
        const timestamp = $(this).parent().attr("timestamp");
        let new_youtube = old_youtube + "?" + timestamp + "?autoplay=1";
        $(".movie-youtube").attr("src", new_youtube);
      }
      return false;
    }
  );
  $(document).on("click", ".podcast-carousel__single .stop", function (e) {
    e.stopPropagation();
    $(this).closest(".podcast-carousel__single").removeClass("active");
    if ($(".movie-youtube")) {
      $(".movie-youtube").attr("src", "");
      $(".movie-youtube").attr("src", old_youtube);
    }
  });

  //Slick Carousel
  if ($(".podcast-carousel").length) {
    $(".podcast-carousel .podcast-carousel__container").slick({
      arrows: true,
      // dots: true,
      // speed: 1500,
      cssEase: "ease",
      easing: "linear",
      autoplay: false,
      infinite: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    blog_posts_height_adjust();
    $(window).on("resize", function () {
      blog_posts_height_adjust();
    });
  }
  function blog_posts_height_adjust() {
    var max_height = 0;
    $(".podcast-carousel__container .podcast-carousel__single").each(
      function () {
        if (max_height < $(this).height()) {
          max_height = $(this).height();
        }
      }
    );
    $(".podcast-carousel__container .podcast-carousel__single").each(
      function () {
        $(this).height(max_height);
      }
    );
  }
});
