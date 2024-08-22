let heroLinks = document.querySelectorAll(".intro_menu a, .footer_menu a");

heroLinks.forEach((el) => {
  el.addEventListener("mouseover", () => {
    el.classList.add("u-primary-medium");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("u-primary-medium");
  });
});

let images = document.querySelectorAll("[animate-image-in]");

images.forEach((el) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      scrub: false,
    },
  });

  tl.from(el, {
    duration: 1,
    scale: 1.1,
    rotate: -2,
    transform: "blur(2px)",
    ease: "power1.out",
  });
});

let buttonUnderscores = document.querySelectorAll(".button-link_underscore");

buttonUnderscores.forEach((el) => {
  let button = el.parentElement;

  button.addEventListener("mouseover", () => {
    gsap.to(el, { duration: 0.3, width: "20%" });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(el, { duration: 0.3, width: "100%" });
  });
});

let splittedHeadings = document.querySelectorAll("[split-heading]");

document.addEventListener("DOMContentLoaded", () => {

    splittedHeadings.forEach((el) => {
        let words = el.querySelectorAll(".word");
      
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            markers: false,
            start: "top 70%",
          },
        });
      
        tl.from(words, {
          y: "2.25rem",
          x: "0.75rem",
          rotate: 3,
          filter: "blur(2px)",
          opacity: 0,
          stagger: { each: 0.1, ease: "none", from: "start" },
          duration: 1.25,
          ease: "power3.out",
        });
      });

});



let fadeUp = document.querySelectorAll("[fade-up]");

fadeUp.forEach((el) => {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            markers: false,
            start: "top 70%",
        },
    });

    tl.from(el, {
        y: "2.25rem",
        rotate: 1,
        filter: "blur(2px)",
        opacity: 0,
        duration: 1.25,
        ease: "power3.out",
    });

})
