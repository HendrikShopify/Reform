let heroLogo = document.querySelector(".hero_logo");
let headerLogoWrap = document.querySelector(".header_logo-inner-wrap");
let heroLogoWrap = document.querySelector(".hero_logo-wrap");

function heroLogoAnimation(element) {
  let state = Flip.getState(heroLogo, { props: "all" });

  element.appendChild(heroLogo);

  Flip.from(state, {
    scale: true,
    duration: 1,
    ease: "power3.inOut",
    scrub: true,
  });
}

let headerAnimation = gsap.timeline({ paused: true });

headerAnimation
  .to(".header", {
    marginTop: 0,
    duration: 1,
    ease: "power3.inOut",
  })
  .from(".header_left button", {
    opacity: 0,
  }, "0.5");

ScrollTrigger.create({
  trigger: ".page_main",
  start: "top top",
  end: "520",
  onLeaveBack: () => {
    heroLogoAnimation(heroLogoWrap);
    headerAnimation.reverse();
  },
  onEnter: () => {
    heroLogoAnimation(headerLogoWrap);
    headerAnimation.play();
  },
});

