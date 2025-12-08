function loadPastProjects(pastProjects, container) {
  pastProjects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('past-project-item');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('img');
    projectItem.appendChild(imageDiv);
    imageDiv.innerHTML = `<img src="${project.photo}" alt="${project.title}">`

    const textDiv = document.createElement('div');
    textDiv.classList.add('item-text');
    projectItem.appendChild(textDiv);
    textDiv.innerHTML = `
      <h4>${project.title}</h4>
      <a href="${project.link}">View Project</a>
    `;

    container.appendChild(projectItem);
  });
}

fetch('Portfolio/projects.json')
  .then(response => response.json()).
  then(data => {
    const accordion = document.getElementsByClassName('accordion');

    var index = 1;

    data.forEach(category => {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');

      accordion[0].appendChild(accordionItem);

      const button = document.createElement('div');
      button.classList.add('accordion-board');
      button.textContent = index + ". " + category.category;
      accordionItem.appendChild(button);

      button.innerHTML = `
        <div class="accordion-board-content">

            <div class="left">
              <h2>${index}. ${category.category}</h2>
              <p>${category.description}</p>
            </div>

            <div class="right">
              <span class="accordion-icon">▼</span>
            </div>


          </div>
      `;

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('accordion-content-wrapper');
      accordionItem.appendChild(contentWrapper);

      loadPastProjects(category.past_projects, contentWrapper);

      index++;
    });

    // Add action listener to the accordion board
    const accordionBoard = document.querySelectorAll(".accordion-board");

    accordionBoard.forEach(board => {
      board.addEventListener("click", () => {
        const content = board.nextElementSibling;
        const isOpen = content.style.maxHeight;

        // Close all items
        document.querySelectorAll(".accordion-content-wrapper").forEach(c => {
          c.style.maxHeight = null;
          c.classList.remove("open");
        });
        document.querySelectorAll(".accordion-header").forEach(h => {
          h.classList.remove("active");
        });

        // Open selected one
        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("open");
          header.classList.add("active");
        }
      });
    });


    const sliders = document.querySelectorAll(".accordion-content-wrapper");

    sliders.forEach(slider => {
      const cards = slider.querySelectorAll(".past-project-item");

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            } else {
              entry.target.classList.remove("in-view");
            }
          });
        },
        {
          root: slider,   // observe inside slider
          threshold: 0.5  // 50% of the card must be visible
        }
      );

      cards.forEach(card => observer.observe(card));
    })


  })

