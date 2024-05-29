document.addEventListener("click", async function (event) {
    if (event.target.matches("[button-action='addToCart']")) {
        event.target.querySelector(".button_loader").classList.remove("hide");
      const productVariantId = event.target.closest("[data-first-variant-id]").dataset.firstVariantId;
      await addToCart(productVariantId, 1);
      openMiniCart();
      event.target.querySelector(".button_loader").classList.add("hide");
    }
});