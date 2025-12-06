fetch('Portfolio/projects.json')
  .then(response => response.json()).
  then(data => {
    const accordion = document.getElementsByClassName('accordion');

    var index = 1;

    data.forEach(category => {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');

      accordion[0].appendChild(accordionItem);

      const button = document.createElement('button');
      button.classList.add('accordion-board');
      button.textContent = index + ". " + category.category;
      accordionItem.appendChild(button);

      button.innerHTML = `
        <div class="accordion-board-content">

            <div class="left">
              <h2>${index}. ${category.category}</h2>
              <h4>${category.header}</h4>
              <img src="${category.header_image}" alt="icon" class="accordion-icon-img">
            </div>

            <div class="middle">
              <p>${category.description}</p>
            </div>

            <div class="right">
              <span class="accordion-icon">▼</span>
            </div>


          </div>
      `

      index++;
    });

  })