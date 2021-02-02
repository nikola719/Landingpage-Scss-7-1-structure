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
  var pod_playing = false;
  var carousel_playing = false;
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

  //playing podcast in carousel
  $(document).on(
    "click",
    ".podcast-carousel__details .start-play",
    { passive: true },
    function (e) {
      // switch the screen
      $(this)
        .closest(".podcast-carousel__container")
        .find(".podcast-carousel__single")
        .removeClass("active");
      $(this).closest(".podcast-carousel__single").addClass("active");
      //youtube autoplay according to play button click event
      if ($(".movie-youtube")) {
        const timestamp = $(this).parent().attr("timestamp");
        let new_youtube = old_youtube + "?t=" + timestamp + "&autoplay=1";
        $(".movie-youtube").attr("src", new_youtube);
      }
      //podcast play
      if (
        $(this).closest(".podcast-carousel__single").find("audio").length > 0
      ) {
        $(this)
          .closest(".podcast-carousel__container")
          .find("audio")
          .each(function () {
            $(this).get(0).pause();
            carousel_playing = false;
          });

        $(this)
          .closest(".podcast-carousel__single")
          .find(".image-wrapper audio")
          .get(0)
          .play();
        carousel_playing = true;
      }
    }
  );

  //stop playing podcast in carousel
  $(document).on("click", ".podcast-carousel__single .stop", function (e) {
    e.stopPropagation();
    $(this).closest(".podcast-carousel__single").removeClass("active");
    if ($(".movie-youtube")) {
      $(".movie-youtube").attr("src", "");
      $(".movie-youtube").attr("src", old_youtube);
    }
    $(this)
      .closest(".podcast-carousel__single")
      .find(".image-wrapper audio")
      .get(0)
      .pause();
    carousel_playing = false;
  });
  $(".podcast-carousel__container audio").each(function () {
    $(this).on("ended", function () {
      carousel_playing = false;
      $(this).closest(".podcast-carousel__single").removeClass("active");
    });
  });

  //play podcast upon click event in video-podcast page
  $(document).on("click", ".episode-img__container", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    if (pod_playing == false) {
      $(".episode-featured__podcast").get(0).play();
      pod_playing = true;
    } else {
      $(".episode-featured__podcast").get(0).pause();
      pod_playing = false;
    }
  });
  //podcast end
  $(".episode-featured__podcast").on("ended", function () {
    $(this).closest(".episode-img__container").removeClass("active");
  });

  // play and pause podcast upon click event in single podcast page
  $("body").on("click", ".meta-play", function (e) {
    e.stopPropagation();
    $(this)
      .closest(".article-meta")
      .find(".article-meta__player")
      .addClass("active");
    $(this).closest(".article-meta").find("audio").get(0).play();
  });

  $("body").on("click", ".meta-stop", function (e) {
    e.stopPropagation();
    $(this)
      .closest(".article-meta")
      .find(".article-meta__player")
      .removeClass("active");
    $(this).closest(".article-meta").find("audio").get(0).pause();
  });

  //progressbar customization
  $(".article-meta audio").bind("timeupdate", function () {
    var currentTime = $(this).get(0).currentTime;
    var duration = $(this).get(0).duration;
    var increment = 10 / duration;
    var percent = Math.min(increment * currentTime * 10, 100);
    $(this)
      .closest(".article-meta")
      .find(".progress")
      .css("width", percent + "%");
    $(this)
      .closest(".article-meta")
      .find(".cursor")
      .css("left", percent + "%");
  });

  //podcast end
  $(".article-meta audio").on("ended", function () {
    $(this)
      .closest(".article-meta")
      .find(".article-meta__player")
      .removeClass("active");
    $(this).closest(".article-meta").find(".progress").css("width", 0);
    $(this).closest(".article-meta").find(".cursor").css("left", 0);
  });

  //Slick Carousel
  if ($(".podcast-carousel").length) {
    $(".podcast-carousel .podcast-carousel__container").slick({
      arrows: true,
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
