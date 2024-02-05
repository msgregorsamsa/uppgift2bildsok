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

// Initiera sökparametrarna baserat på formuläret
searchInput = searchbarForm.value;
colorInput = colorChoice.options[colorChoice.selectedIndex].text.toLowerCase();

async function readPictures() {
  // Inkludera sökparametrarna i API-anropet
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

  displayImages(result);
}

//Går igenom sökresultatet.
function displayImages(result) {
  //Rensar ut eventuella tidigare sökningar
  searchResults.innerHTML = '';

  result.map(result => {
    //Skapar en ny div för varje bildelement
    let imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    //Själva bilden skapas
    let image = document.createElement('img');
    image.src = result.webformatURL;
    image.alt = result.user + result.tags;

    // Anchors osv skapas
    let imageLink = document.createElement('a');
    imageLink.href = result.pageURL;
    imageLink.target = '_blank';

    // Skapa en paragraf med formaterad text
    let paragraph = document.createElement('p');
    paragraph.textContent = `Photographer: ${result.user}
    \n | Description: ${result.tags}`;

    // Lägg till p-elementet i imageLink
    imageLink.appendChild(paragraph);

    // Lägg till klassen "image-info"
    imageLink.classList.add('imageInformation');

    //lägger till ny divbehållare under sökresultaten.
    imageContainer.appendChild(image);
    imageContainer.appendChild(imageLink);
    searchResults.appendChild(imageContainer);
  });
}

// Skickar användaren till page 1 vid klick på 'submit'
formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // Uppdatera sökparametrarna
  searchInput = searchbarForm.value;
  colorInput = colorChoice.options[colorChoice.selectedIndex].text.toLowerCase();

  // Gör API-anropet
  page = 1;
  readPictures();
});

// Går till nästa sida vid klick på 'next'
nextButton.addEventListener('click', () => {
  page++;
  readPictures();

  // Scrolla upp till toppen av sidan
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Om du vill ha en smidig rullningseffekt
  });
});

// Återgår till föregående sida vid klick på 'previous'
previousButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    readPictures();
  }
});

// Draft
previousButton.addEventListener('click', () => {

  if(page === 1){
    previousButton.disabled = true;
    previousButton.classList.add('disabled');
  }
  else{
    previousButton.disabled = false;
    previousButton.classList.remove('disabled');
  }
  });
