// Slider Elements
const slider = document.querySelector(".slider-div2");
const items = document.querySelectorAll(".slider-div3");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const sliderContainer = document.querySelector(".slider-div1");

let active = 0;
let totalItems = items.length;
let autoSlide;

// Reset animation on all slides
function resetAnimations() {
    items.forEach(item => {
        const textContainer = item.querySelector(".slider-div3-txt");
        textContainer.classList.remove("animate-text");
        // Force reflow to allow animation replay
        void textContainer.offsetWidth;
    });
}

// Animate the active slide
function animateActiveSlide() {
    const activeTextContainer = items[active].querySelector(".slider-div3-txt");
    activeTextContainer.classList.add("animate-text");
}

// Update slider position and animate
function reloadSlider() {
    const slideWidth = items[0].clientWidth;
    slider.style.transform = `translateX(-${active * slideWidth}px)`;
    slider.style.transition = "transform 1s ease-in-out";

    resetAnimations();
    animateActiveSlide();

    // Restart auto-slide
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 5000);
}

// Next button
nextBtn.addEventListener("click", () => {
    active = (active + 1) % totalItems;
    reloadSlider();
});

// Previous button
prevBtn.addEventListener("click", () => {
    active = (active - 1 + totalItems) % totalItems;
    reloadSlider();
});

// Handle window resize
window.addEventListener("resize", reloadSlider);

// Initialize on load
window.addEventListener("load", () => {
    // Small delay ensures images/styles are rendered
    setTimeout(reloadSlider, 100);
});

// Optional: Pause auto-slide on hover
sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

sliderContainer.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 5000);
});





document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".home--sec5--div5");
    const first = items[0];
    first.classList.add("active");

    items.forEach(item => {
        item.addEventListener("mouseenter", () => {
            first.classList.remove("active");
        });
        item.addEventListener("mouseleave", () => {
            first.classList.add("active");
        });
    });
});



$(document).ready(function(){
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    dots: false,
    nav: false,

    // Responsive breakpoints
    responsive: {
      0: { items: 1 },        
      600: { items: 2 },   
      900: { items: 3 },    
      1200: { items: 4 }      
    }
  });

  // Custom navigation
  $(".custom-next").click(function() {
    owl.trigger("next.owl.carousel");
  });
  $(".custom-prev").click(function() {
    owl.trigger("prev.owl.carousel");
  });
});


// =============================================== Sction 3 Animation ===============================================//

const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-up, .hidden-right');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hidden-left')) {
        entry.target.classList.add('show-left');
      }
      if (entry.target.classList.contains('hidden-up')) {
        entry.target.classList.add('show-up');
      }
      if (entry.target.classList.contains('hidden-right')) {
        entry.target.classList.add('show-right');
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));


// =============================================== End Sction 3 Animation ===============================================//


// =============================================== Sction 4 Animation ===============================================//

// =============================================== End Sction 4 Animation ===============================================//
