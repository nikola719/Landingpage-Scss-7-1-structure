/**
 * This is script for index page
 */
$(document).ready(function () {
  // Wow init
  new WOW().init();

  // Hamburger
  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $(".header").toggleClass("active");
    if ($(this).hasClass("active")) {
      $("body").append('<div class="overlay"></div>');
    } else {
      $("body .overlay").remove();
    }
  });

  //scroll effect
  $(window).on("load scroll", function () {
    let scrollTop = $(window).scrollTop();
    if (scrollTop > 50) $(".header").addClass("is-scrolling");
    else $(".header").removeClass("is-scrolling");
  });

  //filter select
  $(".article-filter__item").click(function () {
    $(this).addClass("filtered");
  });
  $(".filter-cancel").click(function (e) {
    e.stopPropagation();
    $(this).parent().removeClass("filtered");
  });

  //podcasts play movie
  $(".podcast-carousel__details .start img").click(function (e) {
    e.stopPropagation();
    $(this).closest(".podcast-carousel__single").addClass("active");
  });
  $(".podcast-carousel__single .stop").click(function (e) {
    e.stopPropagation();
    $(this).closest(".podcast-carousel__single").removeClass("active");
  });

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
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 560,
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
