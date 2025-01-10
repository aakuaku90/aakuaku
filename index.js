// Throttle function to limit the frequency of splash creation
let lastSplashTime = 0;
const throttleTime = 100; // Minimum time in ms between splashes

// Function to check if the splash effect should be active
function isMainPage() {
  const secondPage = document.querySelector('.second-page'); // Check if the second page is visible
  const secondPageRect = secondPage.getBoundingClientRect();
  return secondPageRect.top >= window.innerHeight; // Splash works if the second page is not in view
}

// Splash effect
document.addEventListener('mousemove', (e) => {
  if (!isMainPage()) return; // Disable splash if not on the main page

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

// Media data
const mediaData = {
  items: [
    { src: 'media/tui1.jpg', type: 'image', place: 'South Hall' },
    { src: 'media/hedghog.jpg', type: 'image', place: 'South Hall' },
    { src: 'media/tui2.jpg', type: 'image', place: 'South Hall' },
    { src: 'media/tui3.jpg', type: 'image', place: 'South Hall' },
    { src: 'media/finalproject.mp4', type: 'video', place: 'South Hall' },
    { src: 'media/southhals.JPG', type: 'image', place: 'South Hall' },
    { src: 'media/southhas.JPG', type: 'image', place: 'South Hall' },
  ],
};

// Function to generate gallery items
function generateGallery(data) {
  const container = document.getElementById('gallery-container');

  // Duplicate items to create seamless scrolling
  const duplicatedItems = [...data.items, ...data.items];

  duplicatedItems.forEach((item) => {
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('gallery-item');

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true; // Enable playback controls
      mediaDiv.appendChild(video);

      // Stop scrolling when video is playing
      video.addEventListener('play', () => stopScrolling());
      video.addEventListener('pause', () => startScrolling(container));
    } else if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = 'Gallery Item';
      mediaDiv.appendChild(img);
    }

    // Generate current time
    const currentTime = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // Add place and time overlay
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.innerHTML = `
      <p>${item.place}</p>
      <p>${currentTime}</p>
    `;
    mediaDiv.appendChild(contentDiv);

    container.appendChild(mediaDiv);
  });

  // Start scrolling
  startScrolling(container);

  // Add event listeners for forward and backward buttons
  document.querySelector('.scroll-forward').addEventListener('click', () => {
    scrollGallery(container, 'forward');
  });

  document.querySelector('.scroll-backward').addEventListener('click', () => {
    scrollGallery(container, 'backward');
  });

  // Stop scrolling on hover
  container.addEventListener('mouseover', () => stopScrolling());
  container.addEventListener('mouseout', () => {
    const playingVideo = document.querySelector('video:playing'); // Check if a video is playing
    if (!playingVideo) {
      startScrolling(container);
    }
  });
}

// Scrolling control variables
let scrollInterval = null;

// Function to start circular scrolling
function startScrolling(container) {
  if (scrollInterval) return; // Prevent multiple intervals

  const scrollSpeed = 1; // Adjust speed (pixels per frame)
  let scrollPosition = container.scrollLeft;

  scrollInterval = setInterval(() => {
    scrollPosition += scrollSpeed;
    container.scrollLeft = scrollPosition;

    // Reset scroll position when it reaches the end of duplicated items
    if (scrollPosition >= container.scrollWidth / 2) {
      scrollPosition = 0;
    }
  }, 16); // ~60 frames per second
}

// Function to stop circular scrolling
function stopScrolling() {
  clearInterval(scrollInterval);
  scrollInterval = null;
}

// Function to scroll gallery with forward and backward buttons
function scrollGallery(container, direction) {
  const scrollAmount = 300; // Amount to scroll (matches item width)
  stopScrolling(); // Stop automatic scrolling while interacting
  container.scrollBy({
    left: direction === 'forward' ? scrollAmount : -scrollAmount,
    behavior: 'smooth',
  });
}

// Initialize the gallery on DOM load
document.addEventListener('DOMContentLoaded', () => {
  generateGallery(mediaData);
});

// Emails 
emailjs.init('dKTzGGTarsTgSIOsQ'); // Replace with your EmailJS User ID

document.getElementById('send-email').addEventListener('click', function () {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value || !email.value || !message.value) {
    alert('All fields are required.');
    return;
  }

  const templateParams = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  emailjs
    .send('service_enwer1c', 'template_ed9j9o8', templateParams)
    .then(function (response) {
      alert('Message sent successfully!');
      // Clear the form fields
      name.value = '';
      email.value = '';
      message.value = '';
    })
    .catch(function (error) {
      alert('Failed to send message. Please try again.');
    });
});

