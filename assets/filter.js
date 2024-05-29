let filterForm = document.querySelector(".filters");
let sortSelect = document.getElementById("sortBy");
let collectionHandle = filterForm.getAttribute("data-collection-handle");
let filterCheckboxes = filterForm.querySelectorAll("input[type='checkbox']");
let filterPriceInputs = filterForm.querySelectorAll("input[type='number']");

sortSelect.addEventListener("change", function (e) {
  e.preventDefault();
  let formData = new FormData(filterForm);
  let params = new URLSearchParams(formData);
  let queryString = params.toString();
  filterWithAjax(queryString);
});

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(filterForm);
  let params = new URLSearchParams(formData);
  let queryString = params.toString();
  filterWithAjax(queryString);
});

filterCheckboxes.forEach((el) => {
  el.addEventListener("change", () => {
    let formData = new FormData(filterForm);
    let params = new URLSearchParams(formData);
    let queryString = params.toString();
    filterWithAjax(queryString);
  });
});

filterPriceInputs.forEach((el) => {
  el.addEventListener("change", () => {
    let formData = new FormData(filterForm);
    let params = new URLSearchParams(formData);
    let queryString = params.toString();
    filterWithAjax(queryString);
  });
});

function filterWithAjax(queryString) {
  fetch(`/collections/${collectionHandle}?${queryString}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      const text = data;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;

      console.log();

      const newPagination = tempDiv.querySelector(
        ".collection_pagination"
      ).innerHTML;
      const paginationContainer = document.querySelector(
        ".collection_pagination"
      );

      if(newPagination) {
        paginationContainer.innerHTML = newPagination
      }

      const newProducts = tempDiv.querySelector(
        ".collection_product-grid"
      ).innerHTML;
      const productGrid = document.querySelector(".collection_product-grid");

      productGrid.innerHTML = newProducts;

      const newTags = tempDiv.querySelectorAll(".filters_tags-body a");
      const tagsWrapper = document.querySelector(".filters_tags-body");

      tagsWrapper.innerHTML = "";
      newTags.forEach((el) => {
        tagsWrapper.appendChild(el);
      });

      const newTagsTop = tempDiv.querySelector(".filters_tags-top").innerHTML;
      const tagsTopContainer = document.querySelector(".filters_tags-top");

      tagsTopContainer.innerHTML = newTagsTop;

      const newFilterValues = tempDiv.querySelectorAll(".filters_filters li");
      const currentFilterValues = document.querySelectorAll(
        ".filters_filters li"
      );

      newFilterValues.forEach((newFilter, index) => {
        const currentFilter = currentFilterValues[index];

        const newClasses = Array.from(newFilter.classList);
        const currentClasses = Array.from(currentFilter.classList);

        currentClasses.forEach((className) => {
          if (!newClasses.includes(className)) {
            currentFilter.classList.remove(className);
          }
        });

        newClasses.forEach((className) => {
          if (!currentClasses.includes(className)) {
            currentFilter.classList.add(className);
          }
        });

        const newInputChecked = newFilter.querySelector("input:checked");
        const currentInputChecked =
          currentFilter.querySelector("input:checked");

        if (
          newInputChecked &&
          (!currentInputChecked ||
            !newInputChecked.isSameNode(currentInputChecked))
        ) {
          currentFilter.querySelector("input").checked = true;
        } else {
          currentFilter.querySelector("input").checked = false;
        }

        const newInputDisabled = newFilter.querySelector("input:disabled");
        const currentInputDisabled =
          currentFilter.querySelector("input:disabled");

        if (
          newInputDisabled &&
          (!currentInputDisabled ||
            !newInputDisabled.isSameNode(currentInputDisabled))
        ) {
          currentFilter.querySelector("input").disabled = true;
        } else {
          currentFilter.querySelector("input").disabled = false;
        }
      });

      history.replaceState(null, null, "?" + queryString);
      addLazyLoading();
      addToolTips();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.body.addEventListener("click", function (event) {
  const targetElement = event.target;

  let isFilterTag = false;
  let currentElement = targetElement;
  let href = null;

  while (currentElement !== document.body) {
    if (currentElement.matches(".filters a[href]")) {
      href = currentElement.getAttribute("href");
      break;
    }
    currentElement = currentElement.parentNode;
  }

  if (href) {
    isFilterTag = true;
    event.preventDefault();

    if (href.includes("?")) {
      let params = href.split("?")[1];
      filterWithAjax(params);
    } else {
      filterWithAjax("");
    }
  }
});

let filterItem = document.querySelectorAll(".filters_filter");

filterItem.forEach((el) => {
  let header = el.querySelector(".filters_header");
  let content = el.querySelector(".filters_body");

  header.addEventListener("click", () => {
    if (content.classList.contains("is--active")) {
      content.classList.remove("is--active");
    } else {
      content.classList.add("is--active");
    }
  });
});
