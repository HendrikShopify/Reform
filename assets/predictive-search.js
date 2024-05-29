let searchInput = document.getElementById("headerSearchInput");
let modalSearchInput = document.getElementById("modalSearchInput");
let predSearch = document.querySelector(".pred-search");
let predSearchModal = document.querySelector(".pred-search_drawer");
let predSearchBackground = predSearch.querySelector(".pred-search_background");
let predSearchCloseButton = document.getElementById("predSearchClose");

let predSearchOpenState = false;

let predSearchAnimation = gsap.timeline({ paused: true });

predSearchAnimation
  .set(predSearch, {
    display: "flex",
  })
  .from(
    predSearchModal,
    {
      x: "100%",
      duration: 0.25,
      ease: "power1.inOut",
    },
    "<"
  )
  .from(
    predSearchBackground,
    {
      backgroundColor: "rgba(0, 0, 0, 0)",
      duration: 0.25,
      ease: "power1.inOut",
    },
    "<"
  );

// open en close predictive search

searchInput.addEventListener("focus", () => {
  openPredSearch();
});

predSearchCloseButton.addEventListener("click", () => {
  closePredSearch();
});

predSearchBackground.addEventListener("click", () => {
  closePredSearch();
});

// Function to open the predictive search modal
function openPredSearch() {
  predSearchAnimation.play();
  predSearchAnimation.eventCallback("onComplete", () => {
    modalSearchInput.focus();
  });
  predSearchOpenState = true;
  document.querySelector("body").style.overflow = "hidden";
}

// Function to close the predictive search modal
function closePredSearch() {
  predSearchAnimation.reverse();
  predSearchOpenState = false;
  document.querySelector("body").style.overflow = "auto";
}

// PREDICTIVE SEARCH

let timer;

modalSearchInput.addEventListener("input", (e) => {
  console.log(modalSearchInput.value);

  clearTimeout(timer);

  if (modalSearchInput.value) {
    timer = setTimeout(() => {
      fetchSearchResults(modalSearchInput.value);
    }, 300);
  }
});

// Fetch and display search results

function fetchSearchResults() {
  let searchQuery = modalSearchInput.value.trim();

  fetch(
    window.Shopify.routes.root +
      `search/suggest?q=${searchQuery}&section_id=predictive-search`
  )
    .then((response) => {
      console.log(response);
      requestResponse = response;
      return response.text();
    })
    .then(async (text) => {
      if (!requestResponse.ok) {
        throw new Error(`${requestResponse.status}: ${text}`);
      }

      await displaySearchResults(text);
      addLazyLoading();
    })
    .catch((error) => {
      console.error(error);
    });
}

function displaySearchResults(text) {
  const resultsMarkup = new DOMParser()
    .parseFromString(text, "text/html")
    .querySelector(".pred-search .pred-search_body").innerHTML;

  document.querySelector(".pred-search .pred-search_body").innerHTML =
    resultsMarkup;
}
