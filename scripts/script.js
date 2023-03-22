import { contenidoVideoTube } from "./data.js";
console.log(contenidoVideoTube);




const containervideos = document.querySelector(".main__videos");
console.log(containervideos);

const printVideos = (container, videosList) => {
  container.innerHTML = "";

  videosList.forEach((elementVideo) => {
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
};

//Escuchar DOMContentLoaded y se imprimen las imágenes
let filteredArray = contenidoVideoTube;
const nuevoArray = JSON.parse(sessionStorage.getItem("NuevoArray"));
console.log(nuevoArray);
if (nuevoArray == null) {
  document.addEventListener("DOMContentLoaded", () => {
    printVideos(containervideos, contenidoVideoTube);
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    printVideos(containervideos, nuevoArray);
    filteredArray = nuevoArray;
  });
}

//Escuchar input en el buscador
const input = document.querySelector("#searchImput");
input.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  if (nuevoArray == null) {
    filteredArray = contenidoVideoTube.filter((video) =>
      video.name.toLowerCase().includes(query) || video.author.toLocaleLowerCase().includes(query))
  } else {
    filteredArray = nuevoArray.filter((video) =>
      video.name.toLowerCase().includes(query) || video.author.toLocaleLowerCase().includes(query))
  }
  printVideos(containervideos, filteredArray);
});

//Escuchar click en las imágenes
document.addEventListener("click", (event) => {
  const dataVideoAttribute = event.target.getAttribute("data-video");
  if (dataVideoAttribute === "videos") {
    const id = event.target.getAttribute("name");
    sessionStorage.setItem("idVideo", JSON.stringify(id));
    window.location.href = "./pages/details.html";
  }
});

// Escuchar click en las tags
document.addEventListener("click", (e) => {
  const dataBtnAttribute = e.target.getAttribute("data-btn");
  console.log(dataBtnAttribute);
  if (dataBtnAttribute === "btn") {
    const valorBtn = e.target.getAttribute("value");
    console.log(valorBtn);

    if (filteredArray.length >= 20) {
      const categoryVideo = filteredArray.filter(
        (video) => video.category === valorBtn
      );
      console.log(categoryVideo);
      printVideos(containervideos, categoryVideo);
    } else {
      const categoryVideo = contenidoVideoTube.filter(
        (video) => video.category === valorBtn
      );
      console.log(categoryVideo);
      printVideos(containervideos, categoryVideo);
    }

    if (valorBtn === "Todos") {
      if (filteredArray.length >= 20) {
        const TodosLosVideos = filteredArray.slice();
        printVideos(containervideos, TodosLosVideos);
      } else {
        const TodosLosVideos = contenidoVideoTube.slice();
        printVideos(containervideos, TodosLosVideos);
      }
    }
  }
});

//Escuchar click en agregar video
document.addEventListener("click", (e) => {
  const dataForm = e.target.getAttribute('data-form');
  if (dataForm === "forms") {
    window.location.href = "./pages/addVideo.html"
  }
});

//Eliminar video
//document.querySelector('.span_deleteVideo').style.display = 'none';
const deleteVideo = document.querySelector('#deleteVideo');
console.log(deleteVideo);
deleteVideo.addEventListener('click', eliminarVideo);

function eliminarVideo() {
  //document.querySelector('.span_deleteVideo').style.display = '';
  const iddelete = document.getElementById('deleteIdVideo').value;
  console.log(iddelete);

  if (nuevoArray == null) {
    var videoIndelete =contenidoVideoTube.indexOf(contenidoVideoTube.find(video => video.id == iddelete)) ;
    console.log(videoIndelete);
    const videoDelete = contenidoVideoTube.splice(videoIndelete, 1);
  } else {
    var videoIndelete =nuevoArray.indexOf(nuevoArray.find((video => video.id == iddelete))) ;
    console.log(videoIndelete);
    const videoDelete = nuevoArray.splice(videoIndelete, 1);
  }
  if(nuevoArray == null){
    printVideos (containervideos, contenidoVideoTube)
  }else {
    printVideos(containervideos, nuevoArray)
  }
 
}