localStorage.setItem('esta-mi-llave', 'valor-asignado')

// funciones
const getFotos = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/photos', { // Con el JWT consumir la API http://localhost:3000/api/photos.
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        const { data } = await response.json()

        return data

    } catch (error) {

    }
}

const getFotosSeleccion = async (jwt, numero) => {
    try {
        const response = await fetch(`http://localhost:3000/api/photos?page=${numero}`, { // traiga más fotos (http://localhost:3000/api/photos?page=x), que deben ser añadidas al listado existente
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        const { data } = await response.json()

        return data

    } catch (error) {

    }
}

const postData = async (email2, password2) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email2,
                password: password2
            })
        });
        const { token } = await response.json(); // Obtener el JWT a través del formulario de login entregado.
        // console.log(token);
        localStorage.setItem('my-token', token); //Persistir el token utilizando localStorage.
        return token;
    } catch (error) {
        console.log(error);
    }

}

const carrucel = (fotos) => {

    let activo = "active";
    let pagina = "";
    // console.log(fotos);
    pagina = `
    <div class="row">
    <div class="text-left col-6">FEED</div> <div class="text-right col-6"><button id="logoOut" class="btn btn-primary mr-5">Logo Out</div>
  </div>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
<div class="carousel-inner">
   `;

    /** 
     * Manipular el JSON de respuesta de la API anterior y manipular el DOM con
    JavaScript para mostrar las imágenes.
     * 
     */
    fotos.forEach((element, index) => {
        if (index != 0) activo = "";

        pagina += `
         <div class="carousel-item ${activo}">
         <img src="${element.download_url}" class="d-block w-100"  width="${element.width}"   alt="${element.author}">
         </div>
       `;

    });

    pagina += `
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
    </a>
    </div>
    <div class="text-center"><button class="fotoAlbum btn btn-primary mr-5">Agregar Fotos album 1</button><button class="fotoAlbum btn btn-primary mr-5">Agregar Fotos album 2</button><button class="fotoAlbum btn btn-primary mr-5">Agregar Fotos album 3</button>
    <button class="fotoAlbum btn btn-primary mr-5">Agregar Fotos album 4</button><button class="fotoAlbum btn btn-primary mr-5">Agregar Fotos album 5</button><button class="fotoAlbum btn btn-primary mr-5">Agregar Fotos album 6</button>
    </div> 
    `;

    feed.innerHTML = pagina;
    // console.log(pagina);
    // agregar propiedad click a los botones e ingresar el n° de album

    
        botones = document.querySelectorAll(".fotoAlbum");
        botones.forEach((i, p) => {
            i.addEventListener("click", async (e) => {
                console.log("boton n° :" + p);

                const fotosNuevas = await getFotosSeleccion(token, p + 2);
                // console.log(fotosNuevas);

                albunesFotos = albunesFotos.concat(fotosNuevas);
                // albunesFotos = {...albunesFotos,...fotosNuevas}
                // albunesFotos = Object.assign(albunesFotos,fotosNuevas);
                // albunesFotos.push(fotosNuevas);
                // console.log(fotos);
                console.log(albunesFotos);
                console.log("largo del objeto :" + albunesFotos.length);
                carrucel(albunesFotos);
 
            });

        });


        const logoOut = document.getElementById("logoOut");
        logoOut.addEventListener("click", (e) => {
console.log("logoOUt");
localStorage.clear(); // Crear botón de logout que elimine el JWT almacenado y vuelva la aplicación a su estado inicial.

location.reload(true);
   });

}

// main
const formulario = document.getElementById("formulario");
let feed = document.getElementById("feed");
let albunesFotos = {};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const botones = document.querySelectorAll(".fotoAlbum");

    let email = formulario.email.value;
    let password = formulario.password.value;


    token = await postData(email, password)
    console.log(token);

    if (token) {   // Cargar el feed de fotos cuando exista el JWT.

        //   Al momento de recibir el JWT ocultar el formulario y mostrar el feed principal con las fotos.
        $(formulario).toggle();
        const fotos = await getFotos(token);
        albunesFotos = fotos;
        // albunesFotos.push(fotos);
        // console.log(fotos);
        console.log(albunesFotos);
        carrucel(albunesFotos);
    }

});



