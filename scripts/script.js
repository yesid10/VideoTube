import { contenidoVideoTube } from "./data.js"  
console.log(contenidoVideoTube);

const containervideos = document.querySelector(".main__videos");
console.log(containervideos);

const printVideos = (container, videosList) => {
    container.innerHTML = "";

    videosList.forEach(elementVideo => {
        container.innerHTML += `
        <div class="videos">
            <section class="videos_iframe">
                <figure class="image__miniature">
                    <img data-video="videos" name=${elementVideo.id} src= ${elementVideo.miniature}></img>
                </figure>
                <figure>
                    <img class='icon_image' src=${elementVideo.icon_image}>
                </figure>
                <div class='author_views'>
                    <h4 data-video="videos" name=${elementVideo.id}>${elementVideo.name}<h4>
                    <div class="info">
                        <p>${elementVideo.author}<p>
                        <p>${elementVideo.views_time}<p>
                    </div>
                </div>
            </section>
        </div>
        
        `;
    });
}
//Escuchar DOMContentLoaded y se imprimen las imágenes

const nuevoArray = JSON.parse(sessionStorage.getItem('NuevoArray'));
console.log(nuevoArray)
if(nuevoArray == null) {
    document.addEventListener('DOMContentLoaded', ()=>{
        printVideos(containervideos, contenidoVideoTube)
    });
}else {
    document.addEventListener('DOMContentLoaded', ()=>{
        printVideos(containervideos, nuevoArray)
    });
}



//Escuchar click en las imágenes
document.addEventListener("click", (event) => {
    const dataVideoAttribute = event.target.getAttribute('data-video');
    if (dataVideoAttribute === "videos"){
        const id = event.target.getAttribute("name");
        sessionStorage.setItem("idVideo", JSON.stringify(id));
        window.location.href = "./pages/details.html"
    }
});



// Escuchar click en las tags
document.addEventListener('click', e => {
    const dataBtnAttribute = e.target.getAttribute('data-btn');
    console.log(dataBtnAttribute);
    if (dataBtnAttribute === "btn"){
        const valorBtn = e.target.getAttribute("value");
        console.log(valorBtn);
        
        const categoryVideo = contenidoVideoTube.filter(video => video.category === valorBtn);
        console.log(categoryVideo);
        printVideos(containervideos,categoryVideo);

        if (valorBtn === "Todos"){
            const TodosLosVideos = contenidoVideoTube.slice();
            printVideos(containervideos, TodosLosVideos)
        }
    }
});

//Escuchar click en agregar video

document.addEventListener("click", (e) => {
    const dataForm = e.target.getAttribute('data-form');
    if (dataForm === "forms"){
        window.location.href = "./pages/addVideo.html"
    }
});