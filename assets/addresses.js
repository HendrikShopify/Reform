let newAddressButton = document.getElementById("addNewButton");
let newAddress = document.querySelector(".new-address");
let newAddressModal = newAddress.querySelector(".new-address_modal");
let newAddressForm = newAddress.querySelector("form");
let newAddressBackground = newAddress.querySelector(".new-address_background");
let newAddressCloseButton = newAddress.querySelector(".new-address_close");

let newAddressOpenState = false;

let newAddressAnimation = gsap.timeline({ paused: true });

newAddressAnimation
  .set(newAddress, {
    display: "flex",
  })
  .from(
    newAddressModal,
    {
      x: "100%",
      duration: 0.35,
      ease: "power1.inOut",
    },
    "<"
  )
  .from(
    newAddressBackground,
    {
      backgroundColor: "rgba(0, 0, 0, 0)",
      duration: 0.35,
      ease: "power1.inOut",
    },
    "<"
  );

function openNewAddress() {
  newAddressAnimation.play();
  newAddressOpenState = true;
  document.querySelector("body").style.overflow = "hidden";
}

function closeNewAddress() {
  newAddressAnimation.reverse();
  newAddressOpenState = false;
  document.querySelector("body").style.overflow = "auto";
}

newAddressButton.addEventListener("click", () => {
  openNewAddress();
});

newAddressBackground.addEventListener("click", () => {
  closeNewAddress();
});

newAddressCloseButton.addEventListener("click", () => {
  closeNewAddress();
});

let editAddressButtons = document.querySelectorAll(
  "[button-action='EditAddress']"
);

editAddressButtons.forEach((el) => {
  let addressItem = el.closest(".addresses_item");
  let editAddress = addressItem.querySelector(".edit-address");
  let editAddressModal = editAddress.querySelector(".edit-address_modal");
  let editAddressBackground = editAddress.querySelector(
    ".edit-address_background"
  );
  let editAddressCloseButton = editAddress.querySelector(".edit-address_close");

  let editAddressOpenState = false;

  let editAddressAnimation = gsap.timeline({ paused: true });

  editAddressAnimation.set(editAddress, {
    display: "flex",
  })
    .from(
      editAddressModal,
      {
        x: "100%",
        duration: 0.35,
        ease: "power1.inOut",
      },
      "<"
    )
    .from(
      editAddressBackground,
      {
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.35,
        ease: "power1.inOut",
      },
      "<"
    );

  function openEditAddress() {
    editAddressAnimation.play();
    editAddressOpenState = true;
    document.querySelector("body").style.overflow = "hidden";
  }

  function closeEditAddress() {
    editAddressAnimation.reverse();
    editAddressOpenState = false;
    document.querySelector("body").style.overflow = "auto";
  }

  el.addEventListener("click", () => {
    openEditAddress();
  });

  editAddressBackground.addEventListener("click", () => {
    closeEditAddress();
  });

  editAddressCloseButton.addEventListener("click", () => {
    closeEditAddress();
  });
});

class CustomerAddress {
  constructor() {
    this.initCustomerAdress();
    this.onCountrySelect();
    this.initDeleteAddressButtons();
  }

  initDeleteAddressButtons() {
    let deleteAddressButtons = document.querySelectorAll("[button-action='deleteAddress']");
    if(deleteAddressButtons.length < 1) return;

    deleteAddressButtons.forEach( el=> {
      
      el.addEventListener("click", ()=> {
        let id = el.closest("[data-id]").dataset.id;
        document.querySelector(`form[action='/account/addresses/${id}']`).submit();
      })

    })
  }

  initCustomerAdress() {
    const countrySelectors = document.querySelectorAll(
      "select[name='address[country]']"
    );
    if (countrySelectors.length < 1) return;

    countrySelectors.forEach((select) => {
      var selectedCountry = this.getSelectedCountry(select);

      if (!selectedCountry) return;

      var provinces = JSON.parse(selectedCountry.dataset.provinces);
      var provinceSelector = document.getElementById(
        `province${select.dataset.id}`
      );

      if (provinces.length < 1) {
        provinceSelector.closest(".form_field").style.display = "none";
      } else {
        provinceSelector.closest(".form_field").style.display = "";
      }

      provinceSelector.innerHTML = "";

      var options = "";
      for (var index = 0; index < provinces.length; index++) {
        if (provinces[index][0] === provinceSelector.getAttribute("value")) {
          options += `<option value="${provinces[index][0]}" selected>${provinces[index][1]}</option>`;
        } else {
          options += `<option value="${provinces[index][0]}">${provinces[index][1]}</option>`;
        }
      }

      provinceSelector.innerHTML = options;
    });
  }

  getSelectedCountry(select) {
    var option, selectedOption;

    for (var index = 1; index < select.options.length; index++) {
      option = select.options[index];

      if (option.value === select.getAttribute("value")) {
        selectedOption = option;
        selectedOption.setAttribute("selected", "selected");
        break;
      }
    }
    return selectedOption;
  }

  onCountrySelect() {
    const countrySelectors = document.querySelectorAll(
      "select[name='address[country]']"
    );
    if (countrySelectors.length < 1) return;

    countrySelectors.forEach((select) => {
      select.addEventListener("change", () => {
        var provinces = JSON.parse(
          select.options[select.selectedIndex].dataset.provinces
        );

        var provinceSelector = document.getElementById(
          `province${select.dataset.id}`
        );

        if (provinces.length < 1) {
          provinceSelector.closest(".form_field").style.display = "none";
        } else {
          provinceSelector.closest(".form_field").style.display = "";
        }

        provinceSelector.innerHTML = "";

        var options = "";
        for (var index = 0; index < provinces.length; index++) {
          if (provinces[index][0] === provinceSelector.getAttribute("value")) {
            options += `<option value="${provinces[index][0]}" selected>${provinces[index][1]}</option>`;
          } else {
            options += `<option value="${provinces[index][0]}">${provinces[index][1]}</option>`;
          }
        }

        provinceSelector.innerHTML = options;
      });
    });
  }
}

const customerAddress = new CustomerAddress();