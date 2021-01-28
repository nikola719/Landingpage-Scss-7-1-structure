/**
 * This is script for index page
 */
$(document).ready(function () {
  // Wow init
  new WOW().init();

  // Init scroll spy
  // $(".header-nav__link").click(function () {
  //   let target = $(this).attr("href");
  //   if (target == "#start") {
  //     $("html, body").animate(
  //       {
  //         scrollTop: 0,
  //       },
  //       800
  //     );
  //     $(".header").removeClass("active");
  //     $(".hamburger").removeClass("active");
  //   } else {
  //     $("html, body").animate(
  //       {
  //         scrollTop: $(target).offset().top,
  //       },
  //       800
  //     );
  //     $(".header").removeClass("active");
  //     $(".hamburger").removeClass("active");
  //   }
  // });

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
});
