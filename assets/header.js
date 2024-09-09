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
  
  

let menuOpenState = false;

function openMenu() {
  if (menuOpenState) return; // Prevent opening if already open
  
  const body = document.querySelector("body");

  // Check if body has the class 'final-state'
  if (!body.classList.contains('final-state')) {
    // Scroll down 460 pixels
    window.scrollTo({
      top: 450,
      behavior: 'smooth' // Smooth scroll down
    });
  }

  body.style.overflow = "hidden";
  menuOpen.timeScale(1).play();
  menuOpenState = true;
}

function closeMenu() {
  if (!menuOpenState) return; // Prevent closing if already closed
  
  const body = document.querySelector("body");
  
  // Check if body has the class 'final-state'
  if (!body.classList.contains('final-state')) {
    // Scroll back to the top of the page only if 'final-state' class does not exist
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll up
    });
  }

  body.style.overflow = "auto";
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
