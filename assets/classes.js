let classesItems = document.querySelectorAll(".classes_image-wrap");
let classImages = document.querySelectorAll(".classes_class img");

let classesTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".classes_grid",
    markers: false,
    scrub: false,
    start: "top 70%"
  },
});

classesTl.fromTo(classesItems, {
  clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)",
}, {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  stagger: { amount: 0.2, ease: "power1.out", from: "start" },
  duration: 1,
  ease: "power1.out",
}).from(classImages, {
  scale: 1.15,
  filter: "blur(2px)",
  opacity: 0,
  stagger: { amount: 0.2, ease: "power1.out", from: "start" },
  duration: 2.25,
  ease: "power3.out",
}, "<");

