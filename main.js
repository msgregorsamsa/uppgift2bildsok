const apiKey = '42110634-489e3894e133cfb0dd6eef927'

let formElement = document.querySelector('form')
let searchbarForm = document.getElementById('#searchbar');
let colorChoice = document.getElementById('#color-choice')

// Ska implementeras
let searchResults = document.querySelector('.search-results');

let previousButton = document.getElementById('#previous-button');
let nextButton = document.getElementById('#next-button');


let searchInput = '';
let page = 1;

// searchbarForm.onSubmit = event => {
//     event.preventDefault();
// }
// readPictures()

async function readPictures(){

    let searchInput = searchbarForm.value;

    let response = await fetch(
                    'https://pixabay.com/api/' +
                    '?key=' + apiKey +
                    '&q=' + searchInput +
                    '&image_type=photo'
                    );

    let json = await response.json();
    let result = data.result;

    result.map(result => {
            
    });
}

function displayResults(response){
    // Implementera hur bilderna visasa upp
    return console.log(response)

}






