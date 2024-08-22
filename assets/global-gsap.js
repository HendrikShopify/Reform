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
        start: "top 80%",
      },
    });

    // Check if the element has the attribute 'right-to-left'
    let isRightToLeft = el.hasAttribute("right-to-left");

    tl.from(words, {
      y: "2.25rem",
      x: isRightToLeft ? "-0.75rem" : "0.75rem", 
      rotate: isRightToLeft ? -3 : 3, 
      filter: "blur(2px)",
      opacity: 0,
      stagger: { each: 0.1, ease: "none", from: isRightToLeft ? "end" : "start" },
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
      start: "top 80%",
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
});


let imagesFadeIn = document.querySelectorAll("[img-fade-in]");

imagesFadeIn.forEach((el) => {

  let image = el.querySelector("img");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      markers: false,
      start: "top 80%",
    },
  });

  tl.from(image, {
    scale: 1.15,
    filter: "blur(1px)",
    duration: 1.25,
    ease: "power3.out",
  });

})