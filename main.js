const apiKey = '42110634-489e3894e133cfb0dd6eef927'

let formElement = document.querySelector('form')
let searchbarForm = document.getElementById('searchbar');
let colorChoice = document.getElementById('color-choice');

let searchResults = document.querySelector('.search-results');

let previousButton = document.getElementById('previous-button');
let nextButton = document.getElementById('next-button');


let searchInput = '';
var colorInput = ''; 
let page = 1;

async function readPictures(){

    searchInput = searchbarForm.value;
    colorInput = colorChoice.options[colorChoice.selectedIndex].text.toLowerCase();

    let response = await fetch(
                    'https://pixabay.com/api/' +
                    '?key=' + apiKey +
                    '&q=' + searchInput +
                    '&colors=' + colorInput +
                    '&image_type=photo'
                    );

    let data = await response.json();
    let result = data.hits; 
    
    displayImages(result)
}




function displayImages(result){
    //Rensar ut eventuella tidigare sökningar
        searchResults.innerHTML = '';
    
    
    //Går igenom sökresultatet.
        result.map(result => { 
            
            //Skapar en ny div för varje bildelement
            let imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            //Själva bilden skapas
            let image = document.createElement('img');
            image.src = result.previewURL;
            image.alt = result.user + result.tags;
            
            //Anchors osv skapas
            let imageLink = document.createElement('a');
            imageLink.href = result.pageURL;
            imageLink.target = '_blank'; //Om bilden öppnas görs det i en ny flik, vill vi ha det så?
            imageLink.textContent = 'Se bilden på Pixabay';
            
            //lägger till ny divbehållare under sökresultaten.
            imageContainer.appendChild(image);
            imageContainer.appendChild(imageLink);
            searchResults.appendChild(imageContainer);   
            });
 
}

formElement.addEventListener('submit', (event) =>{
    event.preventDefault();

    readPictures();
});


