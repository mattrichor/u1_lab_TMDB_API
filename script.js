const API_KEY = `5197b00ea82f89da73de6cee36233d89`
const DOMAIN = 'https://api.themoviedb.org/3'
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original'

const input = document.getElementById('search-input')
const button = document.getElementById('search')
// let userInput = input.value
let movieList = document.querySelector('.movie-list')

const clearSearch = () => {
  movieList.innerHTML = ''
}

button.addEventListener('click', async () => {
  clearSearch()
  let userInput = input.value
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${userInput}&api_key=${API_KEY}`
  )
  for (let i = 0; i < response.data.results.length; i++) {
    const renderList = response.data.results[i].original_title
    const poster = response.data.results[i].poster_path
    const listItem = document.createElement('li')
    const viewDetailBtn = document.createElement('button')

    listItem.className = 'movie-name'
    listItem.innerHTML = `${renderList}<br><img src='${IMAGE_BASE_PATH}${poster}'</img>`

    viewDetailBtn.innerText = 'View Details'
    movieList.append(listItem)
    movieList.append(viewDetailBtn)

    viewDetailBtn.addEventListener('click', async () => {
      const moreDetails = response.data.results[i]
      const listDetails = document.createElement('p')
      listDetails.innerHTML = `<div class ='movie-details'><ul> 
      <li>Overview: ${moreDetails.overview}</li>
      <li>Original Language: ${moreDetails.original_language}</li>
      <li>Movie Score: ${moreDetails.vote_average}</li></ul></div>`
      movieList.prepend(listDetails)
    })
  }
})
