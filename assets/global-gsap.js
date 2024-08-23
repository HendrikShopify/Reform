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
    y: "50%",
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
      start: "top bottom",
    },
  });

  tl.fromTo(el, {
    clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)",
  }, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    stagger: { amount: 0.2, ease: "power1.out", from: "start" },
    duration: 1,
    ease: "power1.out",
  }).from(image, {
    scale: 1.1,
    filter: "blur(2px)",
    stagger: { amount: 0.2, ease: "power1.out", from: "start" },
    duration: 2.25,
    ease: "power3.out",
  }, "<");

})

document.addEventListener("DOMContentLoaded", () => {
  gsap.from("body", {
    filter: "blur(1px)",
    duration: .5,
    ease: "power3.out",
  })
  gsap.to(".preloader", {
    duration: 0.5,
    opacity: 0,
    ease: "power3.out",
    onComplete: () => {
      document.querySelector(".preloader").style.display = "none";
    },
  })
})


let productCards = document.querySelectorAll(".product-card");

productCards.forEach((el) => {

  let image = el.querySelector("img");

  el.addEventListener("mouseover", () => {
    gsap.to(image, {
      scale: 1.05,
      duration: 0.5,
      ease: "power3.out",
    })
  })

  el.addEventListener("mouseleave", () => {
    gsap.to(image, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    })
  })

});