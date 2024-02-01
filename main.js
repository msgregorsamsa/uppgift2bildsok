async function readPictures(){

    let response = await fetch(
                    'https://pixabay.com/api/' +
                    '42110634-489e3894e133cfb0dd6eef927'
                    );

                    let json = await response.json();
}

let searchInput = document.querySelector('#searchbar')
