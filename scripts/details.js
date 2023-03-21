import { contenidoVideoTube } from "./data.js";
//Sacar la info del sessionStorage
const idVideo = Number(JSON.parse(sessionStorage.getItem("idVideo")) || 0);
console.log(idVideo)

//Buscar video que recibió click;
const nuevoArray = JSON.parse(sessionStorage.getItem('NuevoArray'));
console.log(nuevoArray)



const videoInData = contenidoVideoTube.find(video => video.id === idVideo);



//capturar container información;
const infoVideoContainer = document.getElementById("information");
//Pintar información function
const mostrarVideoInfo = (infoVideoContainer, videoInData) => {
    const figure = document.createElement("figure");
    figure.classList.add("main__figure");
    figure.innerHTML = `
    <iframe ${videoInData.video}></iframe>`;
    infoVideoContainer.appendChild(figure);

    //Pintar información del video 
    const containerInfo = document.createElement("div");
    containerInfo.classList.add("div__videoInfo");
    const icon_figure = document.createElement("figure");
    icon_figure.innerHTML = `
    <img src=${videoInData.icon_image}>
    `;
    containerInfo.appendChild(icon_figure);
    //--------------------------------------------------------------//
    //div para h4 y p 
    const divH4yP = document.createElement("div");
    divH4yP.classList.add("div__h4yp");
    containerInfo.appendChild(divH4yP);
    const title = document.createElement("h4");
    title.innerHTML = `${videoInData.name}`;
    divH4yP.appendChild(title);
    const autor_views = document.createElement("p");
    autor_views.innerHTML = `${videoInData.views_time}`;
    divH4yP.appendChild(autor_views);

    infoVideoContainer.appendChild(containerInfo);
}
document.addEventListener('DOMContentLoaded', () => {

    mostrarVideoInfo(infoVideoContainer, videoInData);

});

//Pintar videos Sugeridos;
const containervideos = document.querySelector(".main__videos");

const printVideos = (container, videosList, idVideo) => {
    const videosSugeridos = videosList.filter((item) => item.id !== idVideo);
    container.innerHTML = "<p>Videos Sugeridos<p>";
    videosSugeridos.forEach(elementVideo => {
        container.innerHTML += `
        
            <section class="videos_iframe">
                <figure class="image__miniature">
                    <img data-video="videos" name=${elementVideo.id} src= ${elementVideo.miniature}></img>
                </figure>
                <div class='author_views'>
                    <span>
                        <img src= ${elementVideo.icon_image}></img>
                    </span>
                    <h4 data-video="videos" name=${elementVideo.id}>${elementVideo.name}<h4>
                    <div class="info">
                        <p>${elementVideo.author}<p>
                        <p>${elementVideo.views_time}<p>
                    </div>
                </div>
            </section>
        
        
        `;
    });
}
//Escuchar DOMContentLoaded y se imprimen las imágenes
document.addEventListener('DOMContentLoaded', () => {
    printVideos(containervideos, contenidoVideoTube, idVideo)
});

