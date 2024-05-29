let localizationForm = document.querySelector(".localization");

if (localizationForm) {
    let localizationButton = localizationForm.querySelector("button");
    let localizationList = localizationForm.querySelector("ul");
    let localizationInput = document.getElementById("languageInput");
    let localizationLinks = localizationForm.querySelectorAll(".localization_link");

    let localizationOpenState = false;

    function openLocalization() {
        localizationList.classList.remove("hide");
        localizationOpenState = true;
        document.addEventListener("click", clickOutsideLocalization);
    }

    function closeLocalization() {
        localizationList.classList.add("hide");
        localizationOpenState = false;
        document.removeEventListener("click", clickOutsideLocalization);
    }

    function clickOutsideLocalization(event) {
        if (localizationOpenState && !localizationForm.contains(event.target)) {
            closeLocalization();
        }
    }

    localizationButton.addEventListener("click", (event) => {
        if (localizationOpenState === false) {
            openLocalization();
        } else {
            closeLocalization();
        }
        event.stopPropagation(); 
    });

    localizationLinks.forEach((el) => {
        el.addEventListener("click", (event) => {
            event.preventDefault(); 
            let linkValue = el.getAttribute("data-value");
            submitLocalizationForm(linkValue);
        });
    });

    function submitLocalizationForm(langValue) {
        localizationInput.value = langValue;
        localizationForm.submit();
    }
}
