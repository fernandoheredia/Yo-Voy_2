const fs = firebase.firestore();
const auth = firebase.auth()

const publicador1 = document.getElementById('signup-form');
const botones = document.querySelector('#navbarResponsive')

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
    location.href="form_hospedaje.html";
    // close the modal
    //$("#signinModal").modal("hide");
    //alert(e.message)
  });
});

firebase.auth().onAuthStateChanged(user =>{
    if(user)
    {
        var docRef = fs.collection("Usuario").doc(user.uid);

        docRef.get().then((doc) =>{
            if (doc.exists) {
            console.log("Document data:", doc.data());
            const perfil = doc.data();

            publicador1.addEventListener('submit', async e => {
                e.preventDefault();

                const fk_email   = user.email;
                const nombreH = publicador1['inputNomHosp'].value;
                const tipoH = publicador1['inputTipoHosp'].value;
                const origen = publicador1['selectProvOrigen'].value;
                const lugar = publicador1['selectMuniOrigen'].value;
                const desde = publicador1['inputFechaDesde'].value;
                const hasta = publicador1['inputFechaHasta'].value;
                const personasH = publicador1['inputCantPersHosp'].value;
                const telefonoH = publicador1['inputTelHosp'].value;
                const descripcionH = publicador1['inputDescrHosp'].value;
                const nombre = perfil.name;

                const response = await fs.collection('PublicacionesHosp').doc().set({
                        nombreH,
                        tipoH,
                        origen,
                        lugar,
                        desde,
                        hasta,
                        personasH,
                        telefonoH,
                        descripcionH,
                        nombre,
                        fk_email
                    })
            
                console.log(nombreH,tipoH,origen,lugar,desde,hasta,personasH,telefonoH,descripcionH);
                limpiarFormulario();
            });
        }})
        alert("Carga Exitosa.")

    }
    else
    {
      alert("Debes Iniciar Sesion!")   
     
    }
})

function limpiarFormulario() {
    document.getElementById("signup-form").reset();
}


auth.onAuthStateChanged(function(user){
		
    if(user){
        
        botones.innerHTML =  /*html*/ `
        <div id="navbarResponsive" class="collapse navbar-collapse col-lg-4 col-md-4 col-sm-4 col-xs-12 " >
          <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">

          <li class="nav-item ">
          <a class="nav-link " style="color: white; " href="Carpooling-inicio copy.html"><strong>Carpooling!</strong></a>
          </li>
          &nbsp
          <a class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" href="resultado.html">
          <span class="d-flex align-items-center">
              <span class="small">Publicaciones de Hospedajes</span>
          </span>
          </a> 
          &nbsp
            <button  class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" data-bs-toggle="modal">
                <span class="d-flex align-items-center">
                    <a href="dashboard-perfil.html" class="small">Perfil</a>
                </span>
            </button>
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
