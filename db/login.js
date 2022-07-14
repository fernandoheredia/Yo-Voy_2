firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
//const database = firebase.database()
const botones = document.querySelector('#navbarResponsive')

// SingIn

const signInForm = document.querySelector("#Form-Ingresar");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["Email"].value;
  const password = signInForm["Password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // clear the form
    signInForm.reset();
    var email = auth.currentUser.email;
    alert("Bienvenido " + email);
    location.href="index.html";
  });
});


auth.onAuthStateChanged(function(user){
		
  if(user){
      botones.innerHTML =  /*html*/ `
      <div id="navbarResponsive" class="collapse navbar-collapse col-lg-4 col-md-4 col-sm-4 col-xs-12 " >
        <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
        <a href="dashboard-perfil.html" class="small">
          <button  class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" data-bs-toggle="modal">
              <span class="d-flex align-items-center">
                  Perfil
              </span>
          </button>
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
