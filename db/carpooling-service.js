const fs   = firebase.firestore();
const auth = firebase.auth();
const botones = document.querySelector('#navbarResponsive')
function limpiarFormulario() {
    document.getElementById("signup-form").reset();
}


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
    location.href="carpooling-service.html";
    // close the modal
    //$("#signinModal").modal("hide");
    //alert(e.message)
  });
});


firebase.auth().onAuthStateChanged(user =>{
        if(user){
            /* #####   Properties form   ##### */
            const publicador = document.getElementById('signup-form');

            var docRef = fs.collection("Usuario").doc(user.uid);

        docRef.get().then((doc) =>{
            if (doc.exists) {
            console.log("Document data:", doc.data());
            const perfil = doc.data();
            publicador.addEventListener('submit', async e => {
                e.preventDefault();
                const tipo = "Carpooling";
                const fk_email = user.email;
                const nombre = perfil.name;
            
                const vehiculo = publicador['inputAuto'].value;
                const origen = publicador['selectMuniOrigen'].value;
                const destino = publicador['selectMuniDestino'].value;
                const horaSalida = publicador['inputHoraSalida'].value;
                const dia = publicador['inputFecha'].value;
                const cantidad = publicador['inputLugares'].value;
                const telefono = publicador['inputTelefono'].value;
                const descripcion = publicador['inputDescripcion'].value;
                const response = await fs.collection('Publicaciones').doc().set({
                        tipo,
                        fk_email,
                        vehiculo,
                        nombre,
                        origen,
                        destino,
                        horaSalida,
                        dia,
                        cantidad,
                        telefono,
                        descripcion
                    })
                    // console.log(response)
                alert("Carga exitosa.", e.message);
            
                console.log(tipo, origen, descripcion);
                limpiarFormulario();
            });
           
            
        }})

            // Event submit to modifiy each one of the rows in the collection
            
        }
        else{
            alert("Debes iniciar sesion!")
        }
    }
)

// Function used to set all the rows for the matrix(collection)
auth.onAuthStateChanged(function(user){
		
    if(user){
      
        botones.innerHTML =  /*html*/ `
        <div id="navbarResponsive" class="collapse navbar-collapse col-lg-4 col-md-4 col-sm-4 col-xs-12 " >
          <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li class="nav-item ">
              <a class="nav-link " style="color: white; " href="resultado.html"><strong>Hospedaje!</strong></a>
            </li>
            &nbsp
            <a class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" href="carpooling.html">
            <span class="d-flex align-items-center">
                <span class="small">Todas las publicaciones</span>
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
      locacion.href="index.html";
    })
  } 