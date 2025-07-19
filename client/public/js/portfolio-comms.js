// Background gradient animation
document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  let angle = 0;
  setInterval(() => {
    angle = (angle + 1) % 360;
    body.style.background = `linear-gradient(${angle}deg, #C2A98B 25%, #425766 100%)`;
  }, 40);
});

// Fly-in effect on scroll and on load for elements in view
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

function handleFlyIn() {
  // Select all main-content-body elements
  const mainBodies = document.querySelectorAll('.main-content-body');
  let delay = 0;
  mainBodies.forEach((body, idx) => {
    if (!body.classList.contains('visible') && isInViewport(body)) {
      setTimeout(() => {
        body.classList.add('visible');
        // Also animate child fly-in elements immediately
        body.querySelectorAll('.fly-in, .fly-in-left').forEach(el => {
          el.classList.add('visible');
        });
      }, delay);
      delay += 200; // Stagger each main-content-body
    }
  });
}

//document.addEventListener('DOMContentLoaded', handleFlyIn);
window.addEventListener('scroll', handleFlyIn);
window.addEventListener('resize', handleFlyIn);