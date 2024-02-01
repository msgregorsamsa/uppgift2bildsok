const apiKey = '42110634-489e3894e133cfb0dd6eef927'

let searchbarForm = document.querySelector('#searchbar');

searchbarForm.onSubmit = event => {
    event.preventDefault();
}
readPictures()

async function readPictures(){

    let searchInput = searchbarForm.elements.searchbar.value;

    let response = await fetch(
                    'https://pixabay.com/api/' +
                    '?key=' + apiKey +
                    '&q=' + searchInput +
                    '&image_type=photo'
                    );

                    let json = await response.json();

                    displayResults(json.hits);
}

function displayResults(response){
    // Implementera hur bilderna visasa upp
    return console.log(response)

}






