// Fetch JSON data and create photo grid
fetch('services/kitchen-design/kitchen_photos.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('kitchen-main-photo-grid');
    data.forEach(photo => {
      const item = document.createElement('div');
      item.classList.add('photo-item');

      item.innerHTML = `
        <img src="${photo.src}" alt="${photo.name}">
        <div class="caption">
          <span>${photo.name}</span>
          <a href="${photo.url}">Explore Details</a>
        </div>
      `;

      grid.appendChild(item);
    });
  })
  .catch(err => console.error('Error loading photos:', err));
