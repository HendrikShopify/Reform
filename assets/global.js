document.addEventListener('click', function(event) {
  if (event.target.closest('.product-card') && event.target.tagName === 'BUTTON') {
      event.preventDefault();
  }
});

let menuButtons = document.querySelectorAll(".menu-button");
menuButtons.forEach((el) => {
  let megaMenu = el.querySelector(".mega-menu");
  if (megaMenu) {
    el.addEventListener("mouseover", () => {
      megaMenu.style.display = "block";
    });
    el.addEventListener("mouseleave", () => {
      megaMenu.style.display = "none";
    });
  }
});

function addLazyLoading() {
  const lazyLoadImages = document.querySelectorAll(
    "[lazyLoadWrap]"
  );
  
  lazyLoadImages.forEach((el) => {
    const img = el.querySelector("img");
    let imgLoadTl = gsap.timeline({ paused: true });
    imgLoadTl.to(img, {
      opacity: 1,
      duration: 0.125,
    });
    function loaded() {
      imgLoadTl.play();
    }
    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  });
}

addLazyLoading();

// quantity buttons

document.addEventListener("click", (event) => {
  const target = event.target;
  const selector = target.closest(".quantity-selector");

  if (!selector) {
    return;
  }

  const input = selector.querySelector('input[type="number"]');
  const quantityButton = target.closest("[quantitybutton]");

  if (quantityButton) {
    let currentValue = parseInt(input.value, 10);
    const isDecrement = quantityButton.getAttribute("quantitybutton") === "dec";
    const isIncrement = quantityButton.getAttribute("quantitybutton") === "inc";

    if (isDecrement && currentValue > 1) {
      input.value = currentValue - 1;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (isIncrement) {
      input.value = currentValue + 1;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
});


// add product to cart with AJAX

async function addToCart(productId, productQuantity) {

let formData = {
  items: [
    {
      id: productId,
      quantity: productQuantity,
    },
  ],
};

try {
  const response = await fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(
      "Failed to add item to cart. Server responded with status: " +
        response.status
    );
  }

  await updateMiniCart();
  openMiniCart();
  updateCartCount();
} catch (error) {
  console.error("Error adding item to cart:", error);
}

}


// TOOL TIPS

function addToolTips() {

const elementsWithTooltip = document.querySelectorAll("[tooltip-content]");

function handleMouseOver(event) {
  const element = event.target;
  const tooltipContent = element.getAttribute("tooltip-content");

  let tooltip = element._tooltip;
  if (!tooltip) {
    tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);
    element._tooltip = tooltip;
  }

  const rect = element.getBoundingClientRect();
  const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
  tooltip.textContent = tooltipContent;
  tooltip.style.visibility = "visible";
  tooltip.style.top = rect.top + scrollOffset - tooltip.offsetHeight - 8 + "px";
  tooltip.style.left = rect.left + (element.offsetWidth - tooltip.offsetWidth) / 2 + "px";
}

function handleMouseOut(event) {
  const element = event.target;
  const tooltip = element._tooltip;

  
  if (tooltip) {
    tooltip.style.visibility = "hidden";
    tooltip.parentNode.removeChild(tooltip);
    element._tooltip = null;
  }
}

elementsWithTooltip.forEach(function (element) {
  element.addEventListener("mouseover", handleMouseOver);
  element.addEventListener("mouseout", handleMouseOut);
});

}

if (!('ontouchstart' in window)) {
  addToolTips();
}


// collapsables


let accordion = document.querySelectorAll(".accordion");

accordion.forEach(el => {

  let header = el.querySelector(".accordion-header");
  let content = el.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    if (content.classList.contains('is--active')) {
      content.classList.remove('is--active');
    } else {
      content.classList.add('is--active');
    }
  })
})