let mm = gsap.matchMedia();

let heroLogo = document.querySelector(".hero_logo");
let headerLogoWrap = document.querySelector(".header_logo-inner-wrap");

function heroLogoAnimation(element) {
  let state = Flip.getState(heroLogo, { props: "all" });
  element.appendChild(heroLogo);

  let combinedTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_main",
      start: "top top",
      end: "685",
      scrub: 0.5,
    }
  });

  combinedTimeline.add(Flip.from(state, {
    scale: true,
    force3D: false,
    duration: 1,
    ease: "none",
  }));

  combinedTimeline.to(".header", {
    marginTop: 0,
    duration: 1,
    ease: "none",
  }, 0);

  // Add the button animation conditionally using matchMedia
  mm.add("(min-width: 480px)", () => {
    // Animation for the button only runs on screens wider than 479px
    combinedTimeline.from(".header_left button", {
      opacity: 0,
      duration: 0.5,
      ease: "none",
    }, 0.5);
  });
}

window.scrollTo(0, 0);

setTimeout(() => {
  heroLogoAnimation(headerLogoWrap);
}, 100);
