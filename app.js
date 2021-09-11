// pexel api key
const key = "563492ad6f917000010000014592bb563cc749d5a061441b71fd2c49"
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.input')
const form = document.querySelector('.search-form')
let searchValue;
const more = document.querySelector('.more')
let page = 1
let fetchLink
let currentSearch

//Event listeners
searchInput.addEventListener('input', updateinput)
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    currentSearch = searchValue 
    searchPhotos(searchValue)
})
more.addEventListener('click', loadMore)


function updateinput(e){
    searchValue = e.target.value
}


// gza pirveli
async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept:'application/json',
            Authorization: key
        }
    }) 
    const data = await dataFetch.json()
    return data
}

// dom suratebs vtvirtavt divshi
function generatePicture(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `
                                <div class="gallery-info">
                                    <p>${photo.photographer}</p>
                                    <a href="${photo.src.original}">Download</a>
                                </div>
                                <img src="${photo.src.large}"></img>`
        gallery.appendChild(galleryImg)
    });
}


async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15?page=1"
    const data = await fetchApi(fetchLink)
    generatePicture(data)
}



async function searchPhotos(query){
    clear()
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePicture(data)
 }

curatedPhotos() 

function clear(){
    gallery.innerHTML = ''
    searchInput.value = ''
}

async function loadMore(){
    page++
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15?page=${page}`
    }
    const data = await fetchApi(fetchLink)
    generatePicture(data)
}





// meore gza apis wamosagebad
function curatedPhotos2(){
    fetch("https://api.pexels.com/v1/curated?per_page=15?page=1", {
        method:'GET',
        headers:{
            Accept: 'application/json',
            Authorization: key
        }
    })
    .then(Response => {
        return Response.json()
    })
    .then(data => {
        data.photos.forEach(photo => {
            const galleryImg = document.createElement('div')
            galleryImg.classList.add('gallery-img')
            galleryImg.innerHTML = `<img src="${photo.src.large}"></img>
                                    <p>${photo.photographer}</p>`
            gallery.appendChild(galleryImg)
        });
    })
    .catch(err => {
        console.log(err)
    })
}
// curatedPhotos2()