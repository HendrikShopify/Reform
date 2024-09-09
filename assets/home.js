let mm = gsap.matchMedia();

let heroLogo = document.querySelector(".hero_logo");
let headerLogoWrap = document.querySelector(".header_logo-inner-wrap");
let headerBookNow = document.querySelector(".header_booknow");

function heroLogoAnimation(element) {
  let state = Flip.getState(heroLogo, { props: "all" });
  element.appendChild(heroLogo);

  let combinedTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_main",
      start: "top top",
      end: "460",
      scrub: 0.5,
      onEnter: () => {
        // Add the 'final-state' class when the ScrollTrigger enters
        document.body.classList.remove('final-state');
      },
      onLeave: () => {
        // Remove the 'final-state' class when the ScrollTrigger leaves
        document.body.classList.add('final-state');
        console.log("left");
      },
      onLeaveBack: () => {
        // Remove the 'final-state' class when scrolling back up
        document.body.classList.remove('final-state');
      },
      onUpdate: (self) => {
        // Check the progress; if less than 1 (not fully complete), remove the class
        if (self.progress < 1) {
          document.body.classList.remove('final-state');
        }
      },
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

  // Animation for screens smaller than 480px
  mm.add("(max-width: 479px)", () => {
    // Set opacity of .header_booknow to 0 on smaller screens
    combinedTimeline.to(headerBookNow, {
      opacity: 0,
      duration: 0.75,
      ease: "power1.out",
    }, 0);
  });

}

window.scrollTo(0, 0);

setTimeout(() => {
  heroLogoAnimation(headerLogoWrap);
}, 100);
