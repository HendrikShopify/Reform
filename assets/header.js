// menu


let menuButton = document.querySelector(".header_left button");
let menu = document.querySelector(".menu");
let menuItems = menu.querySelectorAll(".menu_item");
let menuLinks = menu.querySelectorAll(".menu_item a");
let menuSocialVisuals = menu.querySelectorAll("img");

let menuOpen = gsap.timeline({ paused: true });

menuOpen
  .set(".menu, .header_background", { display: "flex" })
  .from(".header_background", 
    {
        opacity: 0,
        ease: "power1.out",
    }
  )
  .fromTo(
    ".menu",
    {
      clipPath: "inset(100% 0% 0% 0%)",
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.35,
        ease: "power1.out",
    }, "<0.1"
  ).from(menuSocialVisuals, {
    scale: 1.05,
     rotate: 1,
     filter: "blur(1px)",
     stagger: { amount: 0.15, ease: "none", from: "start" },
     duration: 0.25,
     ease: "power3.out",
   }, "<")
  .from(menuItems, {
    x: "2.25rem",
    y: "0.75rem",
    filter: "blur(1px)",
    rotate: 3,
    opacity: 0,
    stagger: { amount: 0.25, ease: "none", from: "start" },
    duration: 0.75,
    ease: "power3.out",
  }, "<")
  

let menuOpenState = false;

function openMenu() {
  document.querySelector("body").style.overflow = "hidden";
  menuOpen.timeScale(1).play();
  menuOpenState = true;
}

function closeMenu() {
  document.querySelector("body").style.overflow = "auto";
  menuOpen.timeScale(1.25).reverse(); 
  menuOpenState = false;
}


menuButton.addEventListener("click", () => {
  if (menuOpenState) {
    closeMenu();
    menuButton.innerHTML = "Menu";
  } else {
    openMenu();
    menuButton.innerHTML = "Close";
  }
});

menuLinks.forEach((item) => {
    item.addEventListener("mouseover", () => {
        
        gsap.to(item, {
            paddingLeft: "1rem",
            duration: 0.25,
            ease: "power1.inOut",
        })
        
    });
    item.addEventListener("mouseleave", () => {
        gsap.to(item, {
            paddingLeft: "0rem",
            duration: 0.25,
            ease: "power1.out",
        })
    });
});