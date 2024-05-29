let imageSwiperComponent = document.querySelector(".swiper-component.is--image")
let imageSwiperElement = document.querySelector(".swiper.is--image")

let imageSwiperPrevButton = imageSwiperComponent.querySelector(".swiper-prev");
let imageSwiperNextButton = imageSwiperComponent.querySelector(".swiper-next");

var imageSwiper = new Swiper(imageSwiperElement, {
  speed: 350,
  slidesPerGroup: 1,
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  centeredSlides: false,
  mousewheel: { forceToAxis: true },
  navigation: {
    nextEl: imageSwiperNextButton,
    prevEl: imageSwiperPrevButton,
    disabledClass: "disabled"
  },
  breakpoints: {
    480: { slidesPerView: "auto", spaceBetween: 0, slidesPerGroup: 1, },
    768: { slidesPerView: "auto", spaceBetween: 0, slidesPerGroup: 1, },
    992: {
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
    },
  }
});

// image slider

var thumbnailImages = document.querySelectorAll('.product_thumbnail');

// Add click event listeners to thumbnail images
thumbnailImages.forEach(function (thumbnail, index) {
  thumbnail.addEventListener('click', function () {
    goToSlide(index); // Call goToSlide function with index when thumbnail is clicked
  });
});

function goToSlide(index) {
  imageSwiper.slideTo(index);
  updateActiveThumbnail(index);
}

// Function to update active thumbnail
function updateActiveThumbnail(index) {
  var thumbnails = document.querySelectorAll('.product_thumbnail');
  thumbnails.forEach(function (thumb, i) {
    thumb.classList.remove('is--active'); // Remove active class from all thumbnails
    if (i === index) {
      thumb.classList.add('is--active'); // Add active class to the clicked thumbnail
    }
  });
}

// Update active thumbnail when slide changes
imageSwiper.on('slideChange', function () {
  updateActiveThumbnail(imageSwiper.realIndex); // Update active thumbnail
});


