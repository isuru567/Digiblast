// Scroll animation
const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-up, .hidden-zoom');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hidden-left')) {
        entry.target.classList.add('show-left');
      } else if (entry.target.classList.contains('hidden-right')) {
        entry.target.classList.add('show-right');
      } else if (entry.target.classList.contains('hidden-up')) {
        setTimeout(() => entry.target.classList.add('show-up'), index * 150);
      } else if (entry.target.classList.contains('hidden-zoom')) {
        entry.target.classList.add('show-zoom');
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

hiddenElements.forEach(el => observer.observe(el));

// FAQ toggle
const faqs = document.querySelectorAll(".service--sec4--div6");
faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    });
});
