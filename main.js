const apiKey = '42110634-489e3894e133cfb0dd6eef927';

let formElement = document.querySelector('form');
let searchbarForm = document.getElementById('searchbar');
let colorChoice = document.getElementById('color-choice');

let searchResults = document.querySelector('.search-results');

let previousButton = document.getElementById('previous-button');
let nextButton = document.getElementById('next-button');

let searchInput = '';
let colorInput = '';
let page = 1;

searchInput = searchbarForm.value;
colorInput = colorChoice.options[colorChoice.selectedIndex].text.toLowerCase();

async function readPictures() {
  let response = await fetch(
    'https://pixabay.com/api/' +
    '?key=' + apiKey +
    '&q=' + searchInput +
    '&colors=' + colorInput +
    '&image_type=photo' +
    '&page=' + page +
    '&per_page=10'
  );

  let data = await response.json();
  let result = data.hits;
  let totalHits = data.totalHits;
  let perPage = 10;

  totalPages = Math.ceil(totalHits / perPage);
  displayImages(result);
  updateButtonState();
}

function displayImages(result) {
  searchResults.innerHTML = '';

  result.forEach(result => {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    let image = document.createElement('img');
    image.src = result.webformatURL;
    image.alt = result.user + result.tags;

    let imageLink = document.createElement('a');
    imageLink.href = result.pageURL;
    imageLink.target = '_blank';

   
    let paragraph = document.createElement('p');
    paragraph.textContent = `Photographer: ${result.user}
    \n | Description: ${result.tags}`;

    imageLink.appendChild(paragraph);

    imageLink.classList.add('imageInformation');

    imageContainer.appendChild(image);
    imageContainer.appendChild(imageLink);
    searchResults.appendChild(imageContainer);
  });
}

// Skickar användaren till page 1 vid klick på 'submit'
formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  searchInput = searchbarForm.value;
  colorInput = colorChoice.options[colorChoice.selectedIndex].text.toLowerCase();

  page = 1;
  readPictures();
});

// Går till nästa sida vid klick på 'next'
nextButton.addEventListener('click', () => {
  page++;
  readPictures();
  updateButtonState();

  // Scrolla upp till toppen av sidan
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Återgår till föregående sida vid klick på 'previous'
previousButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    readPictures();
  }
  updateButtonState();
});

function updateButtonState() {
  if (page === 1) {
    previousButton.disabled = true;
    previousButton.classList.add('disabled');
  } else {
    previousButton.disabled = false;
    previousButton.classList.remove('disabled');
  }

  if (page === totalPages) {
    nextButton.disabled = true;
    nextButton.classList.add('disabled');
  } else {
    nextButton.disabled = false;
    nextButton.classList.remove('disabled');
  }
}

