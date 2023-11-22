function displayPopup() {
  let popupBackground = document.querySelector(".popup-background");
  popupBackground.classList.add("active");
}

function hidePopup() {
  let popupBackground = document.querySelector(".popup-background");
  popupBackground.classList.remove("active");
}

function initAddEventListenerPopup() {
  let shareBtn = document.querySelector(".share-area button");
  let popupBackground = document.querySelector(".popup-background");
  shareBtn.addEventListener("click", () => {
    displayPopup();
  });

  popupBackground.addEventListener("click", (event) => {
    if (event.target === popupBackground) {
      hidePopup();
    }
  });
}
