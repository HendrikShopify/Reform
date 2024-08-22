const product = JSON.parse(
  document.getElementById("productJsonScript").innerHTML
);
const variantOptions = document.querySelectorAll(
  ".product_info input[type='radio']"
);
const productForm = document.querySelector(
  ".section_product .product-form"
);
const addToCartButton = productForm.querySelector(
  "button[type='submit']"
);
const productHandle = product.handle;
const productPrice = document.getElementById("productPrice");
const productCompareAtPrice = document.getElementById("productCompareAtPrice");
const variants = product.variants;

const addToCartInnerHtml = addToCartButton.innerHTML;

variantOptions.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selectedOptions = Array.from(productForm.querySelectorAll(".product_info input[type='radio']:checked"), (variant) => variant.value);


    // Find matching variant
    const matchedVariant = variants.find((variant) => {
      return selectedOptions.every((option) =>
        variant.options.includes(option)
      );
    });

    if (matchedVariant.available) {
      addToCartButton.classList.remove("is--disabled");
    } else {
      addToCartButton.classList.add("is--disabled");
    }

    // Change product form variant id
    const productFormInput = document.querySelector(
      ".product-form input[name='id']"
    );
    productFormInput.value = matchedVariant.id;

    // Change URL
    window.history.replaceState(
      {},
      "",
      `${productHandle}?variant=${matchedVariant.id}`
    );

    // Change prices
    productPrice.textContent = formatMoney(
      matchedVariant.price,
      project.moneyFormat
    );
    productCompareAtPrice.textContent = formatMoney(
      matchedVariant.compare_at_price,
      project.moneyFormat
    );

    // Hide compare at price if it's not relevant
    matchedVariant.compare_at_price > matchedVariant.price
      ? productCompareAtPrice.classList.remove("hide")
      : productCompareAtPrice.classList.add("hide");

    updateVariantStatuses();
  });
});

function updateVariantStatuses() {
  const selectedOptionOneVariants = variants.filter(
    (variant) =>
    productForm.querySelector(
        'input[type="radio"]:checked'
      ).value === variant.option1
  );

  const inputWrappers = productForm.querySelectorAll(".variant-opions");

  inputWrappers.forEach((option, index) => {
    if (index === 0) return;

    const optionInputs = [...option.querySelectorAll('input[type="radio"]')];
    const previousOptionSelected =
      inputWrappers[index - 1].querySelector(":checked").value;
    const availableOptionInputsValue = selectedOptionOneVariants
      .filter(
        (variant) =>
          variant.available &&
          variant[`option${index}`] === previousOptionSelected
      )
      .map((variantOption) => variantOption[`option${index + 1}`]);

    setInputAvailability(optionInputs, availableOptionInputsValue);
  });
}

function setInputAvailability(elementList, availableValuesList) {
  elementList.forEach((element) => {
    const value = element.getAttribute("value");
    const availableElement = availableValuesList.includes(value);

    element.parentNode.classList.toggle("is--disabled", !availableElement);
  });
}

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  addToCartButton.querySelector(".button_loader").classList.remove("hide");

  try {
    const response = await fetch(window.Shopify.routes.root + "cart/add", {
      method: "POST",
      body: new FormData(productForm),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    await updateMiniCart();
     openMiniCart();
     updateCartCount();
    addToCartButton.querySelector(".button_loader").classList.add("hide");
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
});
