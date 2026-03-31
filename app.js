document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
const toolSlider = document.querySelector(".tool-slider");

if (toolSlider) {
  var toolSliderRef = tns({
    container: toolSlider,
    gutter: 10,
    mouseDrag: false,
    nav: false,
    controls: false,
    autoplayButtonOutput: false,
    preventActionWhenRunning: true,
    autoplay: true,
    autoplayTimeout: 0,
    speed: 5000,
    loop: true,
    responsive: {
      0: {
        items: 3,
      },

      768: {
        items: 5,
      },

      1024: {
        items: 6,
      },
    },
  });
}

const isInitialLoad = !sessionStorage.getItem("hasVisitedBefore");
if (isInitialLoad) {
  sessionStorage.setItem("hasVisitedBefore", "true");
  window.onload = function () {
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 1200);
  };
} else {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}

window.addEventListener("load", () => {
  const dataAccordionContainer = document.querySelectorAll(
    "[data-accordion-container-faq]",
  );

  dataAccordionContainer.forEach((accordionContainer) => {
    const theTabsParent =
      accordionContainer.querySelectorAll(".single-accordion");
    const theTabs = accordionContainer.querySelectorAll(".accordion-trigger");

    function theAccordionClicks(accordionClickEvent) {
      // const clickedTab = accordionClickEvent.currentTarget;
      const parentTab = this.parentElement;

      for (let i = 0; i < theTabsParent.length; i++) {
        if (theTabsParent[i] != parentTab) {
          theTabsParent[i].classList.remove("active");
        }
      }

      if (parentTab.classList.contains("active")) {
        parentTab.classList.remove("active");
      } else {
        parentTab.classList.add("active");
      }
      accordionClickEvent.preventDefault();
    }

    for (let i = 0; i < theTabs.length; i++) {
      theTabs[i].addEventListener("click", theAccordionClicks);
    }
  });
});

new Swiper(".t-slider .swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".t-slider .swiper-button-next",
    prevEl: ".t-slider .swiper-button-prev",
  },
  pagination: {
    el: ".t-slider .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const loader = document.getElementById("form-loader"); // IMPORTANT (use ID)
  const submitButton = document.getElementById("submit-button");

  submitButton.disabled = true;
  loader.style.display = "flex";

  const formData = new FormData(this);

  fetch(
    "https://script.google.com/macros/s/AKfycbymzD-CEDHOFmcZ3fh4KnUHX4VGXNFnnbogrVmrThlOxKHH2oSSwmOwZJggnm73SKm3jw/exec",
    {
      method: "POST",
      body: formData,
      mode: "no-cors", // 🔥 IMPORTANT
    },
  )
    .then(() => {
      // since no-cors, we assume success
      setTimeout(() => {
        Toastify({
          text: "Form submitted successfully!",
          duration: 3000,
          gravity: "bottom",
          position: "right",
          avatar: "./img/tick.svg",
          style: {
            background: "linear-gradient(to right, #333333, #000000)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          },
        }).showToast();

        document.getElementById("form").reset();
      }, 800); // slight delay for better UX
    })
    .catch(() => {
      Toastify({
        text: "Something went wrong!",
        duration: 3000,
        gravity: "top",
        position: "right",
        avatar: "./img/cross.svg",
        style: {
          background: "linear-gradient(to right, #333333, #000000)",
          borderRadius: "10px",
        },
      }).showToast();
    })
    .finally(() => {
      submitButton.disabled = false;
      loader.style.display = "none";
    });
});
