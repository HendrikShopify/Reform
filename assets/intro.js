let introImage = document.querySelector(".intro_visual img");

let introTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: introImage,
        markers: false,
        start: "top bottom"
    },
    });

introTimeline.from(introImage, {
    scale: "1.2",
    filter: "blur(2px)",
    duration: 3.25,
    ease: "power3.out",
});