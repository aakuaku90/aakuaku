// Throttle function to limit the frequency of splash creation
let lastSplashTime = 0;
const throttleTime = 100; // Minimum time in ms between splashes

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSplashTime < throttleTime) return;

  lastSplashTime = now;

  const splash = document.createElement('div');
  splash.classList.add('splash');
  splash.style.left = `${e.clientX - 75}px`; // Center the splash
  splash.style.top = `${e.clientY - 75}px`; // Center the splash
  document.body.appendChild(splash);

  setTimeout(() => splash.remove(), 1500); // Remove splash after animation
});