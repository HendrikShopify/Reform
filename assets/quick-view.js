let quickviewButtons = document.querySelectorAll("[button-action='quickview']");
let quickView = document.querySelector(".quickview");
let quickViewModal = quickView.querySelector(".quickview_modal");
let quickViewProductForm = quickView.querySelector("form");
let quickViewProductIdInput = quickView.querySelector("input[name='id']");
let quickViewProductQuantityInput = quickView.querySelector(
  "input[type='number']"
);
let quickViewAddToCartButton = quickViewProductForm.querySelector("button[type='submit']");
let quickViewBackground = quickView.querySelector(".quickview_background");
let quickViewCloseButton = document.getElementById("quickViewClose");

let quickViewOpenState = false;

let quickViewAnimation = gsap.timeline({ paused: true });

function addQuickViewAnimation() {
  quickView = document.querySelector(".quickview");
  quickViewModal = quickView.querySelector(".quickview_modal");
  quickViewBackground = quickView.querySelector(".quickview_background");
  quickViewCloseButton = document.getElementById("quickViewClose");

  quickViewAnimation
    .set(quickView, {
      display: "flex",
    })
    .from(
      quickViewModal,
      {
        x: "100%",
        duration: 0.35,
        ease: "power1.inOut",
      },
      "<"
    )
    .from(
      quickViewBackground,
      {
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.35,
        ease: "power1.inOut",
      },
      "<"
    );
}

addQuickViewAnimation();



document.addEventListener("click", async function (event) {
  if (event.target.matches("[button-action='quickview']")) {
    let productHandle = event.target.closest("[data-handle]").getAttribute("data-handle");

    event.target.querySelector(".button_loader").classList.remove("hide");

    let data = await fetchProductData(productHandle);
    await replaceProductData(data);

    openQuickView();
    event.target.querySelector(".button_loader").classList.add("hide");
  }
});


quickViewCloseButton.addEventListener("click", () => {
  closeQuickView();
});

quickViewBackground.addEventListener("click", () => {
  closeQuickView();
});

function openQuickView() {
  quickViewAnimation.play();
  quickViewOpenState = true;
  document.querySelector("body").style.overflow = "hidden";
}

function closeQuickView() {
  quickViewAnimation.reverse();
  quickViewOpenState = false;
  document.querySelector("body").style.overflow = "auto";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && quickViewOpenState) {
    closeQuickView();
  }
});

function fetchProductData(productHandle) {
  let url = window.Shopify.routes.root + `products/${productHandle}.js`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });
}

// replace product data

let qvTitle = document.getElementById("qvTitle");
let qvImages = document.getElementById("qvImages");
let qvPrice = document.getElementById("qvPrice");
let qvCompareAtPrice = document.getElementById("qvCompareAtPrice");
let qvDescription = document.getElementById("qvDescription");
let qvProductInput = quickView.querySelector("input[name='id']");

let qvImageInstance = quickView.querySelector(".quickview_image");
let qvFieldsetInstance = quickView.querySelector("fieldset");
let qvLegendInstance = quickView.querySelector("legend");
let qvOptionInstance = quickView.querySelector(".variant-option");

function replaceProductData(productData) {
  let productImages = productData.images;
  let productOptions = productData.options;
  let productTitle = productData.title;

  let productDescription = productData.description;
  let productFirstAvailableVariant;
  let productVariants = productData.variants;

  for (let variant of productVariants) {
    if (variant.available) {
      productFirstAvailableVariant = variant;
      break;
    }
  }

  if (productFirstAvailableVariant.available) {
    quickViewAddToCartButton.classList.remove("is--disabled");
  } else {
    quickViewAddToCartButton.classList.add("is--disabled");
  }


  const productAvailableVariants = productVariants.map(
    (variant) => variant.available
  );
  const productVariantsOptions1 = productVariants.map(
    (variant) => variant.option1
  );
  const productVariantsOptions2 = productVariants.map(
    (variant) => variant.option2
  );
  const productVariantsOptions3 = productVariants.map(
    (variant) => variant.option3
  );

  let productPrice = formatMoney(
    productFirstAvailableVariant.price,
    project.moneyFormat
  );
  let productCompareAtPrice = formatMoney(
    productFirstAvailableVariant.compare_at_price,
    project.moneyFormat
  );

  let productFirstAvailableVariantOptions = [];

  productFirstAvailableVariant.options.forEach((el) => {
    productFirstAvailableVariantOptions.push(el);
  });

  qvImages.innerHTML = "";

  productImages.forEach((image) => {
    const imageElement = qvImageInstance.cloneNode(true);
    imageElement.querySelector("img").src = image;
    qvImages.appendChild(imageElement);
  });

  qvProductInput.value = productFirstAvailableVariant.id;

  qvTitle.innerHTML = productTitle;
  qvDescription.innerHTML = productDescription;
  qvPrice.innerHTML = productPrice;
  if (
    productFirstAvailableVariant.price <
    productFirstAvailableVariant.compare_at_price
  ) {
    qvCompareAtPrice.innerHTML = productCompareAtPrice;
  } else {
    qvCompareAtPrice.innerHTML = "";
  }

  // Clear previous variant options
  quickView.querySelectorAll("fieldset").forEach((el) => {
    el.remove();
  });

  if (productVariants.length > 1) {
    productOptions.forEach((option) => {
      const fieldset = qvFieldsetInstance.cloneNode(true);
      const legend = qvLegendInstance.cloneNode(true);

      fieldset.innerHTML = "";

      legend.textContent = option.name;
      fieldset.appendChild(legend);

      option.values.forEach((value) => {
        const optionWrap = qvOptionInstance.cloneNode(true);

        let optionDisabled = true;

        productVariantsOptions1.forEach((option1_name, index) => {
          switch (option.position) {
            case 1:
              if (
                productVariantsOptions1[index] === value &&
                productAvailableVariants[index]
              ) {
                optionDisabled = false;
              }
              break;
            case 2:
              if (
                option1_name === productFirstAvailableVariant.option1 &&
                productVariantsOptions2[index] === value &&
                productAvailableVariants[index]
              ) {
                optionDisabled = false;
              }
              break;
            case 3:
              if (
                option1_name === productFirstAvailableVariant.option1 &&
                productVariantsOptions2[index] ===
                  productFirstAvailableVariant.option2 &&
                productVariantsOptions3[index] === value &&
                productAvailableVariants[index]
              ) {
                optionDisabled = false;
              }
              break;
            default:
              break;
          }
        });

        if (optionDisabled) {
          optionWrap.classList.add("is--disabled");
        }

        let input = optionWrap.querySelector("input");
        let label = optionWrap.querySelector("label");

        input.name = option.name;
        input.id = `${option.name}-${value}`;
        input.value = value;

        label.setAttribute("for", `${option.name}-${value}`);
        label.textContent = value;

        if (productFirstAvailableVariantOptions.includes(value)) {
          input.setAttribute("checked", "checked");
        } else {
          input.removeAttribute("checked");
        }

        input.addEventListener("change", () => {
          updateQuickViewVariant(productData);
          updateQuickViewOptionStatuses(productData);
        });

        fieldset.appendChild(optionWrap);
      });

      quickViewProductForm.insertBefore(
        fieldset,
        quickViewProductForm.querySelector(".product-form_buttons")
      );
    });
  }
}

// UPDATE VARIANT INFO

function updateQuickViewVariant(product) {
  const selectedOptions = Array.from(
    quickView.querySelectorAll("input[type='radio']:checked"),
    (variant) => variant.value
  );

  // Find matching variant
  const matchedVariant = product.variants.find((variant) => {
    return selectedOptions.every((option) => variant.options.includes(option));
  });

  if (matchedVariant.available) {
    quickViewAddToCartButton.classList.remove("is--disabled");
  } else {
    quickViewAddToCartButton.classList.add("is--disabled");
  }

  // Set product form input value
  quickViewProductIdInput.value = matchedVariant.id;

  // Update product price and compare at price
  qvPrice.textContent = formatMoney(matchedVariant.price, project.moneyFormat);
  if (matchedVariant.price < matchedVariant.compare_at_price) {
    qvCompareAtPrice.textContent = formatMoney(
      matchedVariant.compare_at_price,
      project.moneyFormat
    );
    qvCompareAtPrice.classList.remove("hide");
  } else {
    qvCompareAtPrice.textContent = "";
    qvCompareAtPrice.classList.add("hide");
  }
}

// UPDATE VARIANT OPTIONS STATUSES

function updateQuickViewOptionStatuses(product) {
  const selectedOptionOneVariants = product.variants.filter(
    (variant) =>
      quickViewProductForm.querySelector('input[type="radio"]:checked')
        .value === variant.option1
  );

  const inputWrappers =
    quickViewProductForm.querySelectorAll(".variant-opions");

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

// Adding the product from the modal to the cart

quickViewProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  quickViewProductForm.querySelector(".button_loader").classList.remove("hide");
  let productId = quickViewProductIdInput.value;
  let productQuantity = quickViewProductQuantityInput.value;

  await addToCart(productId, productQuantity)
  closeQuickView();
  openMiniCart();
  quickViewProductForm.querySelector(".button_loader").classList.add("hide");

});
