async function toggleLove(button) {
  const skillName = button.closest('.grid-item').querySelector('h3').textContent;
  const countSpan = button.querySelector('.love-count');
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains('loved')) {
    count -= 1;
    await fetch(`/api/love/${skillName}`, { method: 'POST', body: JSON.stringify({ increment: -1 }) });
  } else {
    count += 1;
    await fetch(`/api/love/${skillName}`, { method: 'POST', body: JSON.stringify({ increment: 1 }) });
  }

  countSpan.textContent = count;
  button.classList.toggle('loved');
}

// Load counts from backend on page load
document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('.grid-item').forEach(async item => {
    const skillName = item.querySelector('h3').textContent;
    const response = await fetch(`/api/love/${skillName}/count`);
    const data = await response.json();
    item.querySelector('.love-count').textContent = data.count;

    if (data.count > 0) {
      item.querySelector('.love-button').classList.add('loved');
    }
  });
});

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

  function navigateToDetails(project) {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    console.log('Scroll position saved:', window.scrollY);
    location.href = `details.html?project=${project}`;
}

function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    console.log('Restoring scroll position:', scrollPosition);
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
}

window.onload = restoreScrollPosition;
window.addEventListener('popstate', restoreScrollPosition);

// footer year
document.getElementById("current-year").textContent = new Date().getFullYear();