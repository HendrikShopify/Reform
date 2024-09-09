let heroLinks = document.querySelectorAll(".intro_menu a");

heroLinks.forEach((el) => {
  el.addEventListener("mouseover", () => {
    gsap.to(el, { duration: 0.3, color: "#FFB342" });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, { duration: 0.3, color: "#000" });
  });
});



function createButtonAnimations() {
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
}

createButtonAnimations();


let splittedHeadings = document.querySelectorAll("[split-heading]");

document.addEventListener("DOMContentLoaded", () => {
  splittedHeadings.forEach((el) => {
    let words = el.querySelectorAll(".word");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        markers: false,
        start: "top 95%",
      },
    });

    let isRightToLeft = el.hasAttribute("right-to-left");

    tl.from(words, {
      y: "2.25rem",
      filter: "blur(1px)",
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
    y: "5rem",

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

  tl.from(image, {
    scale: 1.05,
    filter: "blur(2px)",
    stagger: { amount: 0.2, ease: "power1.out", from: "start" },
    duration: 2.25,
    ease: "power3.out",
  }, "<");

})

document.addEventListener("DOMContentLoaded", () => {
  
  gsap.set(".preloader", {
    duration: 0.1,
    opacity: 0,
    delay: 0.11,
    onComplete: () => {
      document.querySelector(".preloader").style.display = "none";
    },
  })
})


let productCards = document.querySelectorAll(".product-card .product-card_top");

productCards.forEach((el) => {

  let image = el.querySelector("img");

  el.addEventListener("mouseover", () => {
    gsap.to(image, {
      scale: 1.0175,
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