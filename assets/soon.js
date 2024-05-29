let preloader = document.querySelector(".preloader");
let preloaderTl = gsap.timeline({ paused: true });

let logoLeft = document.querySelector(".soon_logo-1");
let logoRight = document.querySelector(".soon_logo-2");

preloaderTl.to(preloader, {
  duration: 1.75,
  autoAlpha: 0,
  ease: "power3.out",
}).from(".soon_image img", {
    scale: 1.1,
    rotate: 2,
    duration: 2.75,
    ease: "power3.out",
}, "<").from(logoLeft, {
    x: "10vw",
    duration: 1.75,
    ease: "power2.out",
}, "<").from(logoRight, {
    x: "-10vw",
    duration: 1.75,
    ease: "power2.out",
}, "<")


document.addEventListener("DOMContentLoaded", function () {
  preloaderTl.play();
});
