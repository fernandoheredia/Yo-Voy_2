console.log("Une los archivos");
const fs = firebase.firestore();
const auth = firebase.auth();

const botones = document.querySelector('#navbarResponsive')
const filtro = document.getElementById("ori");
const btnbuscar = document.getElementById("buscar");
const origen = document.getElementById("selectProvOrigen");
//const destino = filtro['selectMuniDestino'].value;
// btnbuscar.addEventListener("Onclick", async(e) => {
//     getFiltrado
// });
//btnbuscar.addEventListener('click', getFiltrado());

var PublicacionesRef = fs.collection("Publicaciones");
const ContenedorAnuncios = document.getElementById("ContenedorAnuncios");
const onGetPublicaciones = (callback) => fs.collection("Publicaciones").onSnapshot(callback);
// var query = PublicacionesRef.where("nombre", "==", "EL BOLSON");
// console.log(query);
//btnbuscar.addEventListener('click', getFiltrado());
//getFiltrado();

window.addEventListener("DOMContentLoaded", async(e) => {
    onGetPublicaciones((querySnapshot) => {
        ContenedorAnuncios.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            ContenedorAnuncios.innerHTML +=/*html*/ `<di class="col-sm">
            <script src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                                    data-preference-id="80291578-e8c3e410-6fb3-44ac-ac07-a94e3bb5e2d6" data-source="button">
                            </script>
            <div class="col-lg-12 text-center">
                <div class="card"  style="width: 18rem;">
                <div class="card-header">
                <h5 class="card-title">${anuncio.origen}-${anuncio.destino}</h5>

            </div>
                    <img class="card-img-top" src="img/carpooling.jpg"  alt="Foto Ilustrativa">
                    <div class="card-body">
                    <h5 class="card-text">Conductor: ${anuncio.nombre}</h5>
                    <h5 class="card-text">Vehiculo: ${anuncio.vehiculo}</h5>
                    <h5 class="card-text">${anuncio.descripcion}</h5>
                    <h5 class="card-text">Lugares disponibles: ${anuncio.cantidad}</h5>
                    <h5 class="card-text">Dia: ${anuncio.dia}</h5>
                    <h5 class="card-text">Salida: ${anuncio.horaSalida}Hs</h5>
                    <a href="Pago.html">
                            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3">
                                <span class="d-flex align-items-center">
                                    <span class="small">Viajar!</span>
                                </span>
                            </button>
                            </a>
                    </div>
                </div>
            </div>
            </div>

        `;

        });
    })
});

function getFiltrado(){
    const orig = filtro['selectMuniOrigen'].value;
    
    fs.collection("Publicaciones").where("origen", "==", orig)
        .get() 
        .then(async(querySnapshot) => {
            ContenedorAnuncios.innerHTML = "";
                await querySnapshot.forEach((doc) => { 
                    const anuncio = doc.data();
                    ContenedorAnuncios.innerHTML += `<di class="col-sm">
                    <div class="col-lg-12 text-center">
                        <div class="card"  style="width: 18rem;">
                        <div class="card-header">
                        <h5 class="card-title">${anuncio.origen}-${anuncio.destino}</h5>
        
                    </div>
                            <img class="card-img-top" src="img/carpooling.jpg"  alt="Foto Ilustrativa">
                            <div class="card-body">
                            <h5 class="card-text">Conductor: ${anuncio.nombre}</h5>
                            <h5 class="card-text">Vehiculo: ${anuncio.vehiculo}</h5>
                            <h5 class="card-text">${anuncio.descripcion}</h5>
                            <h5 class="card-text">Lugares disponibles: ${anuncio.cantidad}</h5>
                            <h5 class="card-text">Dia: ${anuncio.dia}</h5>
                            <h5 class="card-text">Salida: ${anuncio.horaSalida}Hs</h5>
                            <a href="Pago.html">
                            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3">
                                            <span class="d-flex align-items-center">
                                                <span class="small">Viajar!</span>
                                            </span>
                                        </button>
                                        </a>
                            </div>
                        </div>
                    </div>
                    </div>
        
                `;
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
               
                
           

            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
       
}

btnbuscar.addEventListener("click", async(e) => {
    getFiltrado((querySnapshot) => {
        ContenedorAnuncios.innerHTML += "";
        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            
                ContenedorAnuncios.innerHTML =/*html*/ `<di class="col-sm">
            <div class="col-lg-12 text-center">
                <div class="card"  style="width: 18rem;">
                <div class="card-header">
                <h5 class="card-title">${anuncio.origen}-${anuncio.destino}</h5>

            </div>
                    <img class="card-img-top" src="img/carpooling.jpg"  alt="Foto Ilustrativa">
                    <div class="card-body">
                    <h5 class="card-text">Conductor: ${anuncio.nombre}</h5>
                    <h5 class="card-text">Vehiculo: ${anuncio.vehiculo}</h5>
                    <h5 class="card-text">${anuncio.descripcion}</h5>
                    <h5 class="card-text">Lugares disponibles: ${anuncio.cantidad}</h5>
                    <h5 class="card-text">Dia: ${anuncio.dia}</h5>
                    <h5 class="card-text">Salida: ${anuncio.horaSalida}Hs</h5>
                    <a href="Pago.html">
                            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3">
                                <span class="d-flex align-items-center">
                                    <span class="small">Viajar!</span>
                                </span>
                            </button>
                            </a>
                    </div>
                </div>
            </div>
            </div>

        `;
        
            

        });
    })
    
});



const signInForm = document.querySelector("#Form-Ingresar");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["Email"].value;
  const password = signInForm["Password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // clear the form
    signInForm.reset();
    alert("Bienvenido " + email);
    location.href="carpooling.html";
    // close the modal
    //$("#signinModal").modal("hide");
    //alert(e.message)
  });
});


auth.onAuthStateChanged(function(user){
		
    if(user){
      
        botones.innerHTML =  /*html*/ `
        <div id="navbarResponsive" class="collapse navbar-collapse col-lg-4 col-md-4 col-sm-4 col-xs-12 " >
          <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li class="nav-item ">
              <a class="nav-link " style="color: white; " href="resultado.html"><strong>Hospedaje!</strong></a>
            </li>
            &nbsp
            <a href="dashboard-perfil.html" class="small">
            <button  class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" data-bs-toggle="modal">
                <span class="d-flex align-items-center">
                    Perfil
                </span>
            </button>
            </a>
            &nbsp
            <!-- Boton Ofrecer Carpool -->
            <a class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" href="carpooling-service.html">
            <span class="d-flex align-items-center">
                <span class="small">Ofrecer Carpool</span>
            </span>
            </a>
            &nbsp
            <button id="logout" class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" data-bs-toggle="modal">
                <span class="d-flex align-items-center">
                  <span class="small">Cerrar Sesion</span>
                </span>
            </button>                     
          </ul>
        </div>
        `
        CerrarSesion()
        
        }
        else{
        botones.innerHTML =  /*html*/ `
        <div id="navbarResponsive" class="collapse navbar-collapse col-lg-4 col-md-4 col-sm-4 col-xs-12 " >
          <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" data-bs-toggle="modal" data-bs-target="#login" id="btniniciar" >
                <span class="d-flex align-items-center">
                    <span class="small">Iniciar Sesión</span>
                </span>
            </button>
            &nbsp
            <li >
                <a id="btnregistrarse" class="estiloboton btn btn-secondary  px-3 rounded-pill small"  href="inscripcion.html" >Registrarse</a>
            </li>               
          </ul>
        </div>
        `
        //no user is signed in
    }
  });
  
  const CerrarSesion = () =>{
    const logout = document.querySelector('#logout')
    logout.addEventListener("click", () => {
      auth.signOut()
      alert("Sesion Finalizada")
    })
  } 