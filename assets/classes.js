let classesItems = document.querySelectorAll(".classes_image-wrap");
let classImages = document.querySelectorAll(".classes_class img");

let classesTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".classes_grid",
    markers: false,
    scrub: false,
    start: "top bottom"
  },
});

classesTl.from(classImages, {
  scale: 1.2,
  opacity: 0,
  rotate: 5,
  stagger: { amount: 0.35, ease: "power1.out", from: "start" },
  duration: 3.25,
  ease: "power3.out",
}, "<");

