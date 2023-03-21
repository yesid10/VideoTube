import { contenidoVideoTube } from "./data.js";


const formulario = document.querySelector('.main__formulario');
formulario.addEventListener('submit', agregarVideo)

function agregarVideo(prevenirEvento){
    
    prevenirEvento.preventDefault();
    let id = document.getElementById('Id').value;
    let name = document.getElementById('nombreVideo').value;
    let miniature = document.getElementById('linkMiniatura').value;
    let author = document.getElementById('nameAuthor').value;
    let icon_image = document.getElementById('iconImage').value;
    let video = document.getElementById('linkVideo').value;
    let views_time = document.getElementById('nViews').value;
    let category = document.getElementById('typeCategory').value;

    video = {
        id,
        name,
        miniature,
        author,
        icon_image,
        video,
        views_time,
        category
    }
    contenidoVideoTube.push(video);
    formulario.reset();

    console.log(contenidoVideoTube);
  //Escuchar click en boton agregar
  document.addEventListener("click", (e) => {
    const inicio = e.target.getAttribute('data-inicio');
    if (inicio === "inicio"){
        
        sessionStorage.setItem("NuevoArray", JSON.stringify(contenidoVideoTube));
        window.location.href = "../index.html"
    }
});
};

  