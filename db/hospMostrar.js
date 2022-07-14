
const fs = firebase.firestore();
const auth = firebase.auth()
const botones = document.querySelector('#navbarResponsive')

const ContenedorAnuncios1 = document.getElementById("ContenedorAnuncios");
const onGetPublicaciones = (callback) => fs.collection("PublicacionesHosp").onSnapshot(callback);

const filtro = document.getElementById("ori");
const btnbuscar = document.getElementById("buscar");
const origen = document.getElementById("selectProvOrigen");


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
    location.href="resultado.html";
  });
});

 window.addEventListener("DOMContentLoaded", async(e) => {
        onGetPublicaciones((querySnapshot) => {
            ContenedorAnuncios1.innerHTML = "";
            querySnapshot.forEach((doc) => {
                const anuncio = doc.data();
                ContenedorAnuncios1.innerHTML += /*html*/` 
                
                <div class="card-resultado" >
                          
                <!-- Resultado 2-->
                <div class="row no-gutters">
                    <div class="col-lg-4 col-md-4">
                        <img src="img/Carloz Paz-Hotel.jpg" class="card-img imgResultado" alt="...">
                    </div>
                    <div class="col-lg-4 col-md-8">
                        <div class="card-body">
                    <h5 class="card-title, card-title titulo-res">${anuncio.tipoH}-${anuncio.nombreH}</h5>
                </div>
                <div class="text-center">
                        <div class="card-body card-text text-res">
                            <h5 class="card-text">Ubicacion: ${anuncio.origen}-${anuncio.lugar}</h5>
                            <h5 class="card-text">Dias Disponibles</h5>
                            <h5 class="card-text">desde: ${anuncio.desde}</h5>
                            <h5 class="card-text">hasta: ${anuncio.hasta}</h5>
                            <h5 class="card-text">Lugares disponibles: ${anuncio.personasH}</h5>
                            <h5 class="card-text">Tel: ${anuncio.telefonoH}</h5>
                            <h5 class="card-text">Descripcion: ${anuncio.descripcionH}</h5>
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
    
    fs.collection("PublicacionesHosp").where("lugar", "==", orig)
        .get() 
        .then(async(querySnapshot) => {
            ContenedorAnuncios1.innerHTML = "";
                await querySnapshot.forEach((doc) => { 
                    const anuncio = doc.data();
                    ContenedorAnuncios1.innerHTML += ` <div class="card-resultado" >
                      
                    <!-- Resultado 2-->
                    <div class="row no-gutters">
                        <div class="col-lg-4 col-md-4">
                            <img src="img/Carloz Paz-Hotel.jpg" class="card-img imgResultado" alt="...">
                        </div>
                        <div class="col-lg-4 col-md-8">
                            <div class="card-body">
                        <h5 class="card-title, card-title titulo-res">${anuncio.tipoH}-${anuncio.nombreH}</h5>
        
                    </div>
                    <div class="text-center">
                            <div class="card-body card-text text-res">
                                <h5 class="card-text">Ubicacion: ${anuncio.origen}-${anuncio.lugar}</h5>
                                <h5 class="card-text">Dias Disponibles</h5>
                                <h5 class="card-text">desde: ${anuncio.desde}</h5>
                                <h5 class="card-text">hasta: ${anuncio.hasta}</h5>
                                <h5 class="card-text">Lugares disponibles: ${anuncio.personasH}</h5>
                                <h5 class="card-text">Tel: ${anuncio.telefonoH}</h5>
                                <h5 class="card-text">Descripcion: ${anuncio.descripcionH}</h5>
                                <a href="Pago.html">
                            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3">
                                <span class="d-flex align-items-center">
                                    <span class="small">Viajar!</span>
                                </span>
                            </button>
                            </a>
                                
                            </div>
                            </br>
                            </br>
                            
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
        ContenedorAnuncios1.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            
                ContenedorAnuncios1.innerHTML +=/*html*/` <div class="card-resultado" >
                <script src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                data-preference-id="80291578-e8c3e410-6fb3-44ac-ac07-a94e3bb5e2d6" data-source="button">
                hola</script>
                <!-- Resultado 2-->
                <div class="row no-gutters">
                    <div class="col-lg-4 col-md-4">
                        <img src="img/Carloz Paz-Hotel.jpg" class="card-img imgResultado" alt="...">
                    </div>
                    <div class="col-lg-4 col-md-8">
                        <div class="card-body">
                    <h5 class="card-title, card-title titulo-res">${anuncio.tipoH}-${anuncio.nombreH}</h5>
                    
                </div>
                <div class="text-center">
                        <div class="card-body card-text text-res">
                            <h5 class="card-text">Ubicacion: ${anuncio.origen}-${anuncio.lugar}</h5>
                            <h5 class="card-text">Dias Disponibles</h5>
                            <h5 class="card-text">desde: ${anuncio.desde}</h5>
                            <h5 class="card-text">hasta: ${anuncio.hasta}</h5>
                            <h5 class="card-text">Lugares disponibles: ${anuncio.personasH}</h5>
                            <h5 class="card-text">Tel: ${anuncio.telefonoH}</h5>
                            <h5 class="card-text">Descripcion: ${anuncio.descripcionH}</h5>
                            <a href="Pago.html">
                            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3">
                                <span class="d-flex align-items-center">
                                    <span class="small">Viajar!</span>
                                </span>
                            </button>
                            </a>
                            
                           
                        </div>
                        </br>
                        </br>
                        
                    </div>
                </div>
                </div>
            `;
        
            

        });
    })
    
});




auth.onAuthStateChanged(function(user){
		
    if(user){
        
        botones.innerHTML =  /*html*/ `
        <div id="navbarResponsive" class="collapse navbar-collapse col-lg-4 col-md-4 col-sm-4 col-xs-12 " >
          <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">

          <li class="nav-item ">
          <a class="nav-link " style="color: white; " href="Carpooling-inicio copy.html"><strong>Carpooling!</strong></a>
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
            <a href="form_hospedaje.html" class="small">
            <button id="" class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" data-bs-toggle="modal">
                <span class="d-flex align-items-center">
                    Ofrecer Hospedaje
                </span>
            </button>
            </a>
            &nbsp
          
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

  