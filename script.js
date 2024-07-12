const toggleButton = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
const searchInput = document.getElementById('project-search');
const workCards = document.querySelectorAll('.work-card');
const tagDropdown = document.getElementById('tag-dropdown');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Function to create tag filter options in the dropdown
function createTagFilters() {
  const allTags = new Set();

  workCards.forEach(card => {
    const tags = card.querySelectorAll('.tags li');
    tags.forEach(tag => {
      allTags.add(tag.textContent);
    });
  });

  allTags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    tagDropdown.appendChild(option);
  });
}

// Function to filter projects by tag and search
function filterProjects() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedTag = tagDropdown.value;

  workCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    const cardTags = Array.from(card.querySelectorAll('.tags li')).map(li => li.textContent);

    const matchesSearch = title.includes(searchText) || description.includes(searchText);
    const matchesTag = selectedTag === '' || cardTags.includes(selectedTag);

    if (matchesSearch && matchesTag) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Function to shuffle the work cards
function shuffleWorkCards() {
  const worksGrid = document.querySelector('.works-grid');
  const workCardsArray = Array.from(worksGrid.children);

  for (let i = workCardsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [workCardsArray[i], workCardsArray[j]] = [workCardsArray[j], workCardsArray[i]];
  }

  workCardsArray.forEach(card => {
    worksGrid.appendChild(card);
  });
}

// Call the shuffle function when the page loads
window.addEventListener('load', shuffleWorkCards);

// Initialize tag filters
createTagFilters();

// Initial filtering (show all projects)
filterProjects();

// Event listeners for search input and tag dropdown
searchInput.addEventListener('input', filterProjects);
tagDropdown.addEventListener('change', filterProjects);