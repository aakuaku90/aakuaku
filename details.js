 // Function to go back to the main page
 function goBack() {
  window.history.back();
}

// Project details data
const projectDetails = {
  'health-device': {
    title: 'Breathing Hedgehog',
    description: 'The objective of this project is to design and build a tangible user interface (TUI) in the form of a plush hedgehog that “breathes” to help users cope with stress and anxiety. Relying on Arduino-based sensors and actuators, the prototype detects a user’s heart rate and translates those physiological signals into both physical (servo-driven expansion and contraction) and visual (LED-based color) feedback for guided calming exercises. Methods of development included literature review, group discussions, iterative prototyping, hardware construction, and programming. By employing an embodied, zoomorphic interface, this system seeks to combine playful design with evidence-based anxiety-relief techniques, particularly breathing therapy and haptic feedback.\n\n The first part is hardware building. There are two basic parts in our hardware, which are the servo system and the lighting system. We used a servo motor with a simple gear and rack system to mimic the breath process by pushing the inwall of our hedgehog rhythmically. The materials used in this part are plywood and Acrylic boards. We used laser cutting and saw to make our components and connected everything with screws and glue. As for the lighting part, we used four sets of green and red LEDs to indicate different modes. We pricked acrylic spikes through the fur of our hedgehog doll and placed LEDs between the bottom of the spikes and a cardboard, so that light can travel through acrylic spikes and show the color to our users. \n\nThe second part is Arduino programming. In the prototype we built, the basic logic is: When Arduino receives a signal from the heart rate sensor, it makes green lights blink and keeps detecting the user’s heart rate for 30 seconds. After 30 seconds, we will get an average number of the user’s heart rate. If the number is big enough to pass the threshold, the hedgehog will turn red and begin to breathe. The time of breathing depends on the user’s heart rate. Basically, the faster the heart rate is, the longer the hedgehog will breathe. If the number is too small to pass, the hedgehog will not turn red and move. Because of time and technique limits, this prototype is quite different from our original plan. It’s more for presentation use instead of for real use cases. In our original design, we wanted to use an EDA sensor since it can better indicate the user’s anxiety level. We also try to use remote communication technology to build the connection between the sensor and the hedgehog instead of linking them with the same board. For now, it’s a little bit out of our capacity to bring the full plan into a realistic model. However, we will definitely explore more in the future.',
    links: [
      { url: 'https://github.com/aakuaku/pulse-sensor-coder.git', text: 'GitHub', icon: 'fab fa-github' },
      { url: 'https://medium.com/@andrewakuaku_34437/mac-435e2892b666', text: 'Blog', icon: 'fab fa-medium' },
    ],
    images: ['media/tui1.jpg', 'media/hedghog.jpg', 'media/tui2.jpg', 'media/tui3.jpg'], // Image paths
    video: 'media/finalproject.mp4' // Add the video source for this project
  },
  'foraging': {
    title: 'Information Foraging and Ontology',
    description: '**Research and Ideation**\nThe project began with research into popular platforms that utilize ontology and semantic networks, such as Netflix’s recommendation system and Google’s knowledge graph. These platforms inspired a focus on categorization, user-centric navigation, and meaningful data connections. This initial stage laid the foundation for a platform that emphasizes structured information and intuitive user experiences.\n\n**Prototype Development**\nThe platform was developed using HTML, CSS, and JavaScript due to its small-scale nature and focus on visualization. Although React was initially considered, the simplicity of HTML, CSS, and JavaScript allowed for quicker implementation and easier interaction with the DOM. Key features of the prototype included recipe recommendations tailored to user-selected dietary preferences, cuisine types, and locations; a food explorer showcasing crop details, categories, and uses with an emphasis on sustainability and cultural relevance; and semantic networks that provided a visual representation of the relationships between recipes, crops, and user preferences.\n\n**Data Sourcing**\nHigh-quality images were sourced from Pexels and Pixabay to enhance user engagement. The datasets included attributes such as color, category, nutritional value, usage, and health benefits, curated for both relevance and comprehensiveness.\n\n**Technical Specifications**\nThe platform relied on HTML and CSS for structuring and styling, and JavaScript for managing dynamic content, user interactions, and semantic network visualization. Vis.js was utilized to render semantic networks, enabling clear visualization of relationships. Several Google APIs were integrated to enhance functionality and connect users with real-world data. The Maps JavaScript API displayed interactive maps showing where crops were grown or where recipes were available in nearby restaurants. The Places API retrieved information about nearby restaurants or markets offering specific recipes or selling relevant crops. The Geolocation API determined the user’s current location to provide personalized recommendations for nearby crops or restaurants. The Geocoding API converted user-input addresses into geographic coordinates for seamless map integration. Collectively, these APIs strengthened the bridge between digital information and physical locations, allowing users to locate crops and recipes in the real world. This integration enhanced the platform’s practicality, making it a valuable tool for decision-making and exploration.\n\n**User Interface Design**\nThe platform featured a clean layout, responsive design, and interactive animations for a polished user experience. Semantic networks were styled for enhanced readability, with clearly labeled nodes and edges. Interactive elements guided users in exploring connections, ensuring the platform was intuitive and visually engaging.',
    links: [
      { url: 'https://github.com/aakuaku90/202', text: 'GitHub', icon: 'fab fa-github' },
      { url: 'https://aakuaku90.github.io/202/', text: 'Test site', icon: 'fab fa-globe' },
    ], 
    images: ['media/ontology.png', 'media/food.png', 'media/recom.png'], // Image paths
    video: 'media/forage-video.mp4' // Add the video source for this project
  },
  'students': {
    title: 'Tangible User Interfaces',
    description: 'Developed interactive TUIs for innovative student projects.',
    links: [
      { url: 'https://github.com/example3', text: 'GitHub', icon: 'fab fa-github' },
      { url: 'https://medium.com/example3', text: 'Blog', icon: 'fab fa-medium' },
    ],
    video: 'data-analysis.mp4' // Add the video source for this project
  }
};

// Extract query parameter
const params = new URLSearchParams(window.location.search);
const project = params.get('project');

// Populate the page with project details
if (project && projectDetails[project]) {
  const details = projectDetails[project];

  // Set project title
  document.getElementById('project-title').textContent = details.title;

  // Clear and process the description for line breaks and bold text
  const descriptionContainer = document.getElementById('project-description');
  descriptionContainer.innerHTML = ''; // Clear existing content
  const formattedDescription = details.description
    .replace(/\n/g, '<br>') // Replace '\n' with line breaks
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); // Replace '**text**' with bold text
  descriptionContainer.innerHTML = formattedDescription;

  // Populate the gallery
  const galleryContainer = document.getElementById('project-gallery');
  if (details.images && details.images.length > 0) {
    galleryContainer.innerHTML = ''; // Clear existing gallery content
    details.images.forEach(image => {
      const img = document.createElement('img');
      img.src = image;
      img.alt = `${details.title} Image`;
      img.classList.add('gallery-image');
      galleryContainer.appendChild(img);
    });
  } else {
    galleryContainer.style.display = 'none'; // Hide gallery if no images
  }

  // Populate project links
  const linksContainer = document.getElementById('project-links');
  linksContainer.innerHTML = ''; // Clear previous content
  details.links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
    linksContainer.appendChild(a);
  });

  // Conditionally display video
  const videoSection = document.querySelector('.project-video');
  if (details.video) {
    const videoSource = document.getElementById('project-video-source');
    videoSource.src = details.video;
    document.querySelector('video').load(); // Reload the video element with the new source
  } else {
    videoSection.style.display = 'none'; // Hide the video section if no video
  }
} else {
  // Fallback for unknown projects
  document.getElementById('project-title').textContent = 'Unknown Project';
  document.getElementById('project-description').textContent =
    'Details about this project are unavailable.';
  document.getElementById('project-gallery').style.display = 'none'; // Hide gallery
  document.querySelector('.project-video').style.display = 'none'; // Hide video section
}