const slides = document.querySelectorAll(".slide");
const currentCounter = document.getElementById("current");

let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
  // Remove active class from all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Add active class to current slide
  slides[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

// Show first slide
showSlide(currentIndex);

// Change slide every 3 seconds (matches animation duration)
setInterval(nextSlide, 3000);

const slidesbot = document.querySelectorAll(".slide-bot");
let currentSlide = 0;
const totalSlidesbot = slidesbot.length;
const slideInterval = 3000; // 3 seconds

function nextSlidebot() {
  // Remove active class and add exit animation to current slide
  slidesbot[currentSlide].classList.remove("active");
  slidesbot[currentSlide].classList.add("exit");

  // Remove exit class after animation completes
  setTimeout(() => {
    slidesbot[currentSlide].classList.remove("exit");
  }, 600);

  // Move to next slide (loop back to 0 after last slide)
  currentSlide = (currentSlide + 1) % totalSlidesbot;

  // Add active class to new slide
  slidesbot[currentSlide].classList.add("active");
}

// Start the automatic sliding
setInterval(nextSlidebot, slideInterval);

// ============================================
// JEWELLERY SELECTION - STATE MANAGEMENT
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  // Jewellery items selection
  const jewelItems = document.querySelectorAll(".jewel-item");

  jewelItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove selected class from all items
      jewelItems.forEach((i) => i.classList.remove("selected"));

      // Add selected class to clicked item
      this.classList.add("selected");
    });
  });

  // ============================================
  // SWIPER 1: CUTS SLIDER (Section 4)
  // ============================================

  // Cut labels for the carousel
  const cutLabels = [
    "OVAL",
    "HALF MOON",
    "EMERALD",
    "PRINCESS",
    "ROUND",
    "PEAR",
    "MARQUISE",
    "OVAL",
    "HALF MOON",
    "EMERALD",
    "PRINCESS",
    "ROUND",
    "PEAR",
    "MARQUISE",
  ];

  const cutsSwiper = new Swiper(".cutsSwiper", {
    effect: "coverflow",
    slidesPerView: "auto",
    centeredSlides: true,
    watchSlidesProgress: true,
    simulateTouch: true,
    touchRatio: -1,
    coverflowEffect: {
      rotate: 0,
      stretch: 228,
      depth: 200,
      modifier: 2.5,
      slideShadows: false,
    },
    breakpoints: {
      0: {
        spaceBetween: 25,
        coverflowEffect: {
          stretch: 110,
          depth: 140,
        },
      },
      768: {
        spaceBetween: 20,
        coverflowEffect: {
          stretch: 208,
          depth: 150,
        },
      },
    },
    spaceBetween: 30,
    loop: true,
    speed: 600,
    navigation: {
      nextEl: ".cuts-prev",
      prevEl: ".cuts-next",
    },
    on: {
      slideChange: function () {
        updateCutLabel(this.realIndex);
      },
    },
  });

  function updateCutLabel(index) {
    const labelElement = document.querySelector(".cuts-label p");
    if (labelElement && cutLabels[index]) {
      labelElement.textContent = cutLabels[index];

      // Add animation
      labelElement.style.opacity = "0";
      labelElement.style.transform = "translateY(10px)";

      setTimeout(() => {
        labelElement.style.transition = "all 0.4s ease";
        labelElement.style.opacity = "1";
        labelElement.style.transform = "translateY(0)";
      }, 100);
    }
  }
  window.addEventListener("load", () => {
    cutsSwiper.update();
  });
  // ============================================
  // SWIPER 2: BANNER SLIDER (Section 5)
  // ============================================
  const bannerSwiper = new Swiper(".bannerSwiper", {
    slidesPerView: 1,
    centeredSlides: true,

    //           autoplay: {
    //     delay: 2000,
    //     disableOnInteraction: false,
    //   },
    spaceBetween: 0,
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".banner-next",
      prevEl: ".banner-prev",
    },

    effect: "slide",
    // pagination: {
    //     el: '.banner-pagination',
    //     clickable: true,
    // },
    breakpoints: {
      768: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 1.4,
        spaceBetween: 40,
      },
    },
  });

  // ============================================
  // VIDEO AUTOPLAY FIX
  // ============================================
  const heroVideo = document.querySelector(".hero-section video");
  if (heroVideo) {
    // Ensure video plays on load
    heroVideo.play().catch((error) => {
      console.log("Video autoplay prevented:", error);
    });

    // Replay video when it ends (backup for loop attribute)
    heroVideo.addEventListener("ended", function () {
      this.currentTime = 0;
      this.play();
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR CTA BUTTONS
  // ============================================
  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click effect
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // ============================================
  // PARALLAX EFFECT ON SCROLL
  // ============================================
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;

    // Parallax for hero video
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      const videoContainer = heroSection.querySelector(".video-container");
      if (videoContainer && scrolled < heroSection.offsetHeight) {
        videoContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    }

    // Fade in elements on scroll
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.85) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  });

  // Initialize sections for fade-in effect
  const sections = document.querySelectorAll("section:not(.hero-section)");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // ============================================
  // LOADING ANIMATION
  // ============================================
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.6s ease";
      document.body.style.opacity = "1";
    }, 100);
  });

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all major sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================

  // Lazy loading for images (if not using native lazy loading)
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll to element
function smoothScrollTo(element) {
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ============================================
// EXPORT FUNCTIONS
// ============================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    smoothScrollTo,
    debounce,
    random,
  };
}
