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

async function readPictures() {
  searchInput = searchbarForm.value;
  colorInput = colorChoice.options[colorChoice.selectedIndex].text.toLowerCase();

  let response = await fetch(
    'https://pixabay.com/api/' +
    '?key=' + apiKey +
    '&q=' + searchInput +
    '&colors=' + colorInput +
    '&image_type=photo' +
    '&page=' + page +  // Låter användaren byta mellan nästa och föregående sida
    '&per_page=10'     // Laddar endast in 10 bilder per sida
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

    //Anchors osv skapas
    let imageLink = document.createElement('a');
    imageLink.href = result.pageURL;
    imageLink.target = '_blank';  //Om bilden öppnas görs det i en ny flik, vill vi ha det så?
    imageLink.textContent = '';

    //lägger till ny divbehållare under sökresultaten.
    imageContainer.appendChild(image);
    imageContainer.appendChild(imageLink);
    searchResults.appendChild(imageContainer);
  });
}

// Skickar användaren till page 1 vid klick på 'submit'
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  readPictures();
});

// Går till nästa sida vid klick på 'next'
nextButton.addEventListener('click', () => {
  page++;
  readPictures();
});

// Återgår till föregårende sida vid klick på 'previous'
previousButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    readPictures();
  }
});

// Funktion för att återställa sidan när man klickar på x i sökrutan. OBS fungerar ej
// function resetSearch() {
//   searchbarForm.value = ''; // Återställ sökrutan
//   searchResults.innerHTML = ''; // Rensa bilderna
// }