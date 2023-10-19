const section = document.querySelector('section')
const submitBtn = document.querySelector('.submitBtn')
const form = document.querySelector('form')
const inputs = [...document.querySelectorAll('input')]

// proposed solution

const fetchData = async ({urlApi, post}) => {
    let response
    if(post){
        const formData = new FormData(form)
        const rawBody = JSON.stringify({
            'title': formData.get('title'),
            'year': Number(formData.get('year')),
            'director': formData.get('director'),
            'duration': Number(formData.get('duration')),
            'poster': formData.get('poster'),
            'genre': [...formData.get('genre').replaceAll(' ', '').split(',')],
            'rate': Number(formData.get('rate')),
            'title': formData.get('title')
        })
        
        response = await fetch(urlApi, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: rawBody
        })
        inputs.forEach( input => input.value='')
    }else{
        response = await fetch(urlApi)
    }
    const data = await response.json()
    return data
}

const callData = async (urlApi) => {
    const movies = await fetchData({urlApi})
    const html = movies.map( (movie) => {
        return `
            <div class="movieCard" data-id="${movie.id}">
                <h2 class="movieTitle">${movie.title}</h2>
                <img src="${movie.poster}" alt="${movie.title} poster">
                <p class="movieDirector">${movie.director}</p>
                <button class="deleteBtn">delete</button>
            </div>
        `
    }).join('')
    section.innerHTML = ''
    section.innerHTML += html
}

callData('http://localhost:4545/movies')

submitBtn.addEventListener('click', async ()=>{
    const post = true
    const response = await fetchData({urlApi: 'http://localhost:4545/movies', post})
    callData('http://localhost:4545/movies')
})
document.addEventListener('click', async (e) => {
    if(e.target.matches('button')){
        const article = e.target.closest('.movieCard')
        const id = article.dataset.id

        const response = await fetch(`http://localhost:4545/movies/${id}`, {
            method: 'DELETE'
        })
        if(response.ok){
            article.remove()
        }
    }
})