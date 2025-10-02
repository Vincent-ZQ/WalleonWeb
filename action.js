function sayHello() {
    alert("This is an alert.")
}

// Function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Returns true if:
    // - Element's top is above the bottom of window AND
    // - Element's bottom is below the top of window (hasn't scrolled past)
    return (rect.top < windowHeight && rect.bottom > 0);
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");             // select navbar
  const dropdowns = document.querySelectorAll(".dropdown-content"); // select all dropdowns
    
  function updateDropdownPositions() {
    const navbarHeight = navbar.offsetHeight; // dynamic navbar height
    dropdowns.forEach(dropdown => {
      dropdown.style.top = navbarHeight + "px"; // set top dynamically
    });
  }

  // Set initial positions
  updateDropdownPositions();

  // Update positions on window resize (responsive)
  window.addEventListener("resize", updateDropdownPositions);

  // Initialize all scroll-trigger elements with fade-up class on page load
  const scrollTriggers = document.querySelectorAll('.scroll-trigger');
  scrollTriggers.forEach(element => {
    element.classList.add('fade-up', 'hidden'); // Start as hidden
  });

  // Add a small delay before triggering animations to see the fade effect
  setTimeout(() => {
    handleScrollAnimations();
  }, 100); // 100ms delay
});

// Function to handle scroll animations
function handleScrollAnimations() {
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    
    scrollTriggers.forEach(element => {
        if (isElementInViewport(element)) {
            // Element is visible - add fade-up visible classes
            element.classList.remove('hidden');
            element.classList.add('fade-up', 'visible');
        } else {
            // Element is outside viewport - add fade-up hidden classes
            element.classList.remove('visible');
            element.classList.add('fade-up', 'hidden');
        }
    });
}

// Handle scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Handle resize events (in case viewport changes)
window.addEventListener('resize', handleScrollAnimations);




