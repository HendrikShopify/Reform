let cartButton = document.getElementById("cartButton");
let miniCart = document.querySelector(".mini-cart");
let miniCartDrawer = document.querySelector(".mini-cart_drawer");
let miniCartBackground = miniCart.querySelector(".mini-cart_background");
let miniCartCloseButton = document.getElementById("miniCartClose");

let cartCount = document.querySelector("#cartButton .utility-button_number")

let miniCartOpenState = false;

let miniCartAnimation = gsap.timeline({paused: true})

function addMiniCartAnimation() {
  miniCart = document.querySelector(".mini-cart");
  miniCartDrawer = document.querySelector(".mini-cart_drawer");
  miniCartBackground = miniCart.querySelector(".mini-cart_background");
  miniCartCloseButton = document.getElementById("miniCartClose");

  miniCartAnimation
  .from(miniCartDrawer, {
    x: "100%",
    duration: 0.35,
    ease: "power1.inOut"
  }, "<").from(miniCartBackground, {
    backgroundColor: "rgba(0, 0, 0, 0)",
    duration: 0.35,
    ease: "power1.inOut"
  }, "<")
}

addMiniCartAnimation();

async function openMiniCart() {
  miniCart.style.display = "flex"  
  miniCartAnimation.play();
  miniCartOpenState = true;
  document.querySelector("body").style.overflow = "hidden"
}

async function closeMiniCart() {
  await miniCartAnimation.reverse();
  miniCart.style.display = "none"  
  miniCartOpenState = false;
  document.querySelector("body").style.overflow = "auto"
}
 
cartButton.addEventListener("click", () => {
  openMiniCart();
});

document.querySelectorAll("a[href*='quantity=0']").forEach((el) => {});

document.addEventListener("click", function (event) {
  if (
    event.target.matches("#miniCartClose") ||
    event.target.matches(".mini-cart_background")
  ) {
    closeMiniCart();
  }

  if (event.target.matches('[button-action="deleteItem"]')) {
    showLoader();
    const lineItemId = event.target
      .closest("[data-item-variant-id]")
      .getAttribute("data-item-variant-id");
    const newQuantity = 0;

    changeQuantityCart(lineItemId, newQuantity);
  }
});

document.addEventListener("change", async function (event) {
  if (event.target.matches('.mini-cart input[type="number"]')) {
    showLoader();
    const lineItemId = event.target
      .closest("[data-item-variant-id]")
      .getAttribute("data-item-variant-id");
    const newQuantity = event.target.value;

    changeQuantityCart(lineItemId, newQuantity);
  }
});

async function updateMiniCart() {
  try {
    const res = await fetch("/?section_id=mini-cart");
    const text = await res.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;

    const newMiniCartContent = tempDiv.querySelector(".mini-cart").innerHTML;
    const miniCart = document.querySelector(".mini-cart");

    miniCart.innerHTML = newMiniCartContent;
    addMiniCartAnimation();
    if(miniCartOpenState === true) {
      miniCartAnimation.progress(1);
    } else {
      miniCartAnimation.progress(0);
    }
  } catch (error) {
    console.error("Failed to fetch mini cart:", error);
    alert("Failed to update the mini cart. Please try again.");
  }
}

function changeQuantityCart(lineItemId, newQuantity) {
  const updates = { [lineItemId]: Number(newQuantity) };

  fetch(window.Shopify.routes.root + "cart/update.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updates }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateCartCount();
      updateMiniCart();
    })
    .catch((error) => {
      console.error("Error updating cart:", error);
      alert("Error updating cart. Please try again.");
    });
}

function showLoader() {
  miniCart.querySelector(".mini-cart_loader").classList.remove("hide");
}

async function updateCartCount() {
    const res = await fetch("/cart.js");
    const cart = await res.json();
    cartCount.innerHTML = cart.item_count.toString();;
}

