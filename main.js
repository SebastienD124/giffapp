const API_KEY = 'YOUR_API_KEY';
const searchForm = document.getElementById('search-form');
const searchHistory = document.getElementById('search-history');
const gifGrid = document.getElementById('gif-grid');
 
function fetchGifs(searchTerm) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=12`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayGifs(data.data));
}
 
function displayGifs(gifs) {
  gifGrid.innerHTML = '';
  gifs.forEach(gif => {
    const gifElement = document.createElement('div');
    gifElement.classList.add('col-md-4', 'mb-4');
    gifElement.innerHTML = `
      <img src="${gif.images.fixed_height.url}" class="img-fluid" alt="${gif.title}">
    `;
    gifGrid.appendChild(gifElement);
  });
}
 
function addSearchButton(searchTerm) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-secondary', 'me-2', 'mb-2');
  button.textContent = searchTerm;
  searchHistory.appendChild(button);
}
 
function loadSearchHistory() {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  history.forEach(term => addSearchButton(term));
}
 
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = event.target.elements['search-input'].value;
  fetchGifs(searchTerm);
  addSearchButton(searchTerm);
 
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  history.push(searchTerm);
  localStorage.setItem('searchHistory', JSON.stringify(history));
});
 
searchHistory.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    fetchGifs(event.target.textContent);
  }
});
 
loadSearchHistory();