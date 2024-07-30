"use strict";

// Get Elements
const settingBox = document.querySelector(".settings-box"),
  triggerSettingBox = document.querySelector(".fa-gear"),
  buttonStyles = document.querySelector(".styles-colors"),
  colors = document.querySelectorAll(".colors-list li"),
  optionBox = document.querySelector(".option-box"),
  randomBackEle = document.querySelectorAll(".random-backgrounds span"),
  switcherBullets = document.querySelectorAll(".bullets-switcher span"),
  headerSwitcherContainer = document.querySelector(".header-switcher"),
  headerSwitcherElements = document.querySelectorAll(".header-switcher span"),
  optionTitle4 = document.getElementById("option-title4"),
  header = document.querySelector("header"),
  logo = document.querySelector("header .logo"),
  landingPage = document.querySelector(".landing-page"),
  ourSkills = document.querySelector(".skills"),
  ourGallery = document.querySelectorAll(".gallery img"),
  keyActivate = document.querySelector(".yes"),
  keyDeactivate = document.querySelector(".no"),
  allLinks = document.querySelectorAll(".links a"),
  allBullets = document.querySelectorAll(".nav-bullets .bullet"),
  buttonMenu = document.querySelector(".links-container .toggle-menu"),
  linksContainer = document.querySelector(".links-container .links"),
  syncImgs = document.querySelectorAll('img:not([decoding="async"])');






// Variables
let mainColor = localStorage.getItem("pageColor"),
  counterStyles = 0,
  reset = false,
  styleColors = localStorage.getItem("styleColors"),
  bulletsSwitcherLocal = localStorage.getItem("Bul sSwitcherKey"),
  headerSwitcherLocal = localStorage.getItem("headerSwitcherKey"),
  imageNumber = 0,
  backgroundSwitcher,
  backSwitcherKey = localStorage.getItem("backgroundSwitcherKey"),
  counterStylesLocalStorage = localStorage.getItem("counterStylesLocal");






//! Settings Box [Start]
//*1- Toggle Open Close Settings bar [Start]

if (localStorage.getItem("settingBoxOpen") == "true") {
  settingBox.classList.add("opened");
  triggerSettingBox.classList.add("fa-spin");
  buttonStyles.style.left = "0";
} else {
  settingBox.classList.remove("opened");
  triggerSettingBox.classList.remove("fa-spin");
}

triggerSettingBox.addEventListener("click", () => {
  if (!settingBox.classList.contains("opened")) {
    localStorage.setItem("settingBoxOpen", true);
    settingBox.classList.add("opened");
    triggerSettingBox.classList.add("fa-spin");
    setTimeout(() => {
      buttonStyles.style.left = "0";
    }, 500);
  } else {
    localStorage.setItem("settingBoxOpen", false);
    settingBox.classList.remove("opened");
    triggerSettingBox.classList.remove("fa-spin");
    buttonStyles.style.left = "-40px";
  }
});
//*1- Toggle Open Close Settings bar [end]

//*2- Switch Colors [Start]
// Check If Property Is Exist In Local Storage
if (mainColor !== null) {
  colors.forEach((li) => {
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
  document.documentElement.style.setProperty("--main-color", mainColor);
} else {
  colors[0].classList.add("active");
}
// Set Color On Root And in Local Storage
colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    handleActive(e);
    localStorage.setItem("pageColor", e.target.dataset.color);
  });
});
//*2- Switch Colors [End]

//*3- Colors Styles [Start]
// set value from local Storage
if (styleColors != null) {
  optionBox.style.margin = styleColors;
}
// set value from local Storage
if (counterStylesLocalStorage !== null) {
  counterStyles = parseInt(counterStylesLocalStorage);
}
// change Style colors
buttonStyles.addEventListener("click", () => {
  if (reset === true) {
    optionBox.style.margin = "0 10px";
    localStorage.setItem("styleColors", "0 10px");
    reset = false;
  } else {
    switch (counterStyles) {
      case 0: {
        optionBox.style.margin = "0 40px";
        localStorage.setItem("styleColors", "0 40px");
        counterStyles = 1;
        localStorage.setItem("counterStylesLocal", counterStyles);
        break;
      }
      case 1: {
        optionBox.style.margin = "0 50px";
        localStorage.setItem("styleColors", "0 50px");
        counterStyles = 2;
        localStorage.setItem("counterStylesLocal", counterStyles);
        break;
      }
      case 2: {
        optionBox.style.margin = "0 60px";
        localStorage.setItem("styleColors", "0 60px");
        counterStyles = 3;
        localStorage.setItem("counterStylesLocal", counterStyles);
        break;
      }
      case 3: {
        optionBox.style.margin = "0 80px";
        localStorage.setItem("styleColors", "0 80px");
        counterStyles = 0;
        localStorage.setItem("counterStylesLocal", counterStyles);
        reset = true;
        break;
      }
    }
  }
});
//*3- Colors Styles [End]

//*4- Switch Random Background [Start]
randomBackEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
  });
});

randomBackEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.background == "yes") {
      changeBackground();
      localStorage.setItem(
        "backgroundSwitcherKey",
        e.target.dataset.background
      );
    } else {
      changeBackground(false);
      localStorage.setItem(
        "backgroundSwitcherKey",
        e.target.dataset.background
      );
    }
  });
});
//*4- Switch Random Background [End]

//*5- Activate and Deactivate Bullets [Start]
setTimeout(() => {
  if (bulletsSwitcherLocal !== null) {
    if (bulletsSwitcherLocal == "no") {
      switcherBullets.forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.bullets == bulletsSwitcherLocal) {
          element.classList.add("active");
        }
      });
      allBullets.forEach((bullet) => {
        bullet.style.transform = "translateX(30px)";
      });
    } else {
      allBullets.forEach((bullet) => {
        bullet.style.transform = "translateX(0)";
      });
    }
  }
}, 0);

switcherBullets.forEach((element) => {
  element.addEventListener("click", (e) => {
    handleActive(e);
    localStorage.setItem("BulletsSwitcherKey", e.target.dataset.bullets);
    if (localStorage.getItem("BulletsSwitcherKey") == "no") {
      allBullets.forEach((bullet) => {
        bullet.style.transform = "translateX(30px)";
      });
    } else {
      allBullets.forEach((bullet) => {
        bullet.style.transform = "translateX(0)";
      });
    }
  });
});

//*5- Activate and Deactivate Bullets [End]

//*6- Activate and Deactivate Header [Start]
function activeHeader() {
  header.style.cssText = `
  background-color:
  rgba(255, 255, 255, 0.95);
  position: fixed;
  left: 0;
  top: 0;
  padding: 2px 215px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.95);
  `;
  allLinks.forEach((element) => {
    element.style.color = "black";
    element.addEventListener("mouseenter", () => {
      element.style.cssText = `
          color: var(--main-color);
        `;
    });
    element.addEventListener("mouseout", () => {
      element.style.cssText = `
            color: black;
          `;
    });
  });
  logo.style.color = "black";
}

function DeactivateHeader() {
  header.style.cssText = `
  position: relative;
  padding: 10px;
`;
  allLinks.forEach((element) => {
    element.style.cssText = `color: white;`;
    element.addEventListener("mouseenter", () => {
      element.style.cssText = `
          color: var(--main-color);
        `;
    });
    element.addEventListener("mouseout", () => {
      element.style.cssText = `
          color: white;
        `;
    });
  });
  logo.style.color = "white";
}

if (headerSwitcherLocal !== null) {
  if (innerWidth < 992) {
    headerSwitcherElements.forEach((element) => {
      element.classList.remove("active");
      element.style.cursor = "auto";
    });
  } else {
    if (headerSwitcherLocal == "yes") {
      activeHeader();
      headerSwitcherElements.forEach((element) => {
        element.classList.remove("active");
      });
      headerSwitcherElements.forEach((element) => {
        if (element.className == "yes") {
          element.classList.add("active");
        }
      });
    } else {
      DeactivateHeader();
      headerSwitcherElements.forEach((element) => {
        element.classList.remove("active");
      });
      headerSwitcherElements.forEach((element) => {
        if (element.className == "no") {
          element.classList.add("active");
        }
      });
    }
  }
}

window.onload = () => {
  if (innerWidth < 992) {
    headerSwitcherContainer.classList.add("off");
  } else {
    headerSwitcherContainer.classList.remove("off");
    headerSwitcherElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        handleActive(e);
        localStorage.setItem("headerSwitcherKey", e.target.dataset.header);
        if (e.target.dataset.header === "yes") {
          activeHeader();
        } else {
          DeactivateHeader();
        }
      });
    });
  }
};

//*6- Activate and Deactivate Header [End]
//! Settings Box [End]

//? Landing Page {Change BackGround} [Start]
let images = [
  "https://moamal-2000.github.io/template2/images/jason-goodman.webp",
  "https://moamal-2000.github.io/template2/images/corporate.webp",
  "https://moamal-2000.github.io/template2/images/french-village.webp",
  "https://moamal-2000.github.io/template2/images/shot-tower.webp",
  "https://moamal-2000.github.io/template2/images/view-plaza.webp",
  "https://moamal-2000.github.io/template2/images/mount-mont.webp",
  "https://moamal-2000.github.io/template2/images/modern-buildings.webp",
];

function changeBackground(switcher = true) {
  if (!switcher) {
    clearInterval(backgroundSwitcher);
  } else {
    backgroundSwitcher = setInterval(() => {
      landingPage.style.backgroundImage = `url(${images[imageNumber]})`;
      imageNumber++;
      if (imageNumber === images.length) {
        imageNumber = 0;
      }
    }, 8000);
  }
}
changeBackground();

// check if property is exist in local storage and do action
if (backSwitcherKey !== null) {
  if (backSwitcherKey == "yes") {
    changeBackground();
    keyActivate.classList.add("active");
    keyDeactivate.classList.remove("active");
  } else {
    changeBackground(false);
    keyDeactivate.classList.add("active");
    keyActivate.classList.remove("active");
  }
}
//? Landing Page {Change BackGround} [End]

//! Loading Skills [Start]
window.onscroll = () => {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;

  if (scrollY > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
//! Loading Skills [End]

//? popup for gallery images [Start]
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay For images
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);
    // Create popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // Check If Image have alt Attribute
    if (img.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imageText = document.createTextNode(img.alt);
      imageHeading.append(imageText);
      popupBox.append(imageHeading);
    }
    // Create Image For popup
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    // append the image to popup box
    popupBox.append(popupImage);
    // Append popup Box To Body Element
    document.body.append(popupBox);
    // Create Close Button For popup Box
    let closeButton = document.createElement("span");
    closeButton.append("X");
    closeButton.className = "close-button";
    popupBox.append(closeButton);
    
    overlay.onclick = () => {
      overlay.remove();
      popupBox.remove();
    };
  });
});
// remove popup image
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
//? popup for gallery images [End]

//! Nav Bullet Script [Start]
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
      localStorage.setItem("goToSection", e.target.dataset.section);
    });
  });
}

scrollToSection(allLinks);
scrollToSection(allBullets);
//! Nav Bullet Script [End]

//? Active Function [Start]
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}
//? Active Function [End]

//! Reset Options button [Start]
document.querySelector(".reset-options").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload(true);
});
//! Reset Options button [End]

//? Toggle menu [Start]
buttonMenu.onclick = (e) => {
  e.stopPropagation();
  buttonMenu.classList.toggle("menu-active");
  linksContainer.classList.toggle("menu-active");
};

document.addEventListener("click", (e) => {
  if (e.target !== buttonMenu && e.target !== linksContainer) {
    if (buttonMenu.classList.contains("menu-active")) {
      buttonMenu.classList.toggle("menu-active");
      linksContainer.classList.toggle("menu-active");
    }
  }
});

linksContainer.onclick = (e) => {
  e.stopPropagation();
};
//? Toggle menu [End]

// Dynamic years in footer
let dateInYears = document.querySelector(".date-in-years");
dateInYears.innerHTML = new Date().getFullYear();
dateInYears.style.userSelect = "none";

// Set all images to async loading
syncImgs.forEach((img) => {
  img.setAttribute("decoding", "async");
  img.setAttribute("width", "100%");
  img.setAttribute("height", "100%");
});