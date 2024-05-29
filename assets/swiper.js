let swipers = document.querySelectorAll(".swiper-component.is--default");

swipers.forEach(el => {

  let swiperElement = el.querySelector(".swiper")

  let swiperPrevButton = el.querySelector(".swiper-prev");
  let swiperNextButton = el.querySelector(".swiper-next");
  let swiperPagination = el.querySelector(".swiper-bullets");

  const slidesPerGroup = swiperElement.getAttribute('data-slides-per-group');
  const slidesPerView = swiperElement.getAttribute('data-slides-per-view');
  const spaceBetween = swiperElement.getAttribute('data-space-between');
  const loopValue = swiperElement.getAttribute('data-loop');

  const loop = loopValue.toLowerCase() === 'true';

  console.log(spaceBetween)

  var swiper = new Swiper(swiperElement, {
    speed: 600,
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: spaceBetween,
    loop: loop,
    centeredSlides: false,
    mousewheel: { forceToAxis: true },
    pagination: {
      el: swiperPagination,
      clickable: true
    },
    navigation: {
      nextEl: swiperNextButton,
      prevEl: swiperPrevButton,
      disabledClass: "disabled"
    },
    breakpoints: {
      480: { slidesPerView: "auto", spaceBetween: spaceBetween, slidesPerGroup: 1, },
      768: { slidesPerView: "auto", spaceBetween: spaceBetween, slidesPerGroup: 1, },
      992: {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        slidesPerGroup: 1,
      },
    }
  });

})
