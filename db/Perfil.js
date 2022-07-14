const fs = firebase.firestore();
const auth = firebase.auth()

//cerrar sesion
const logout = document.querySelector("#logout")
logout.addEventListener('click',()=>{
  auth.signOut()
  alert("Sesion Finalizada.")
})

const ContenedorPerfil = document.getElementById("Perfil");


firebase.auth().onAuthStateChanged(user =>{
    if(user)
    {
      var email = user.email;
      var docRef = fs.collection("Usuario").doc(user.uid);

      docRef.get().then((doc) =>{
       if (doc.exists) {
        console.log("Document data:", doc.data());
        const perfil = doc.data();
        ContenedorPerfil.innerHTML = `
        <div class="row justify-content-center align-content-center text-center">
            <div class="columna col-lg-6">
               <h2>Datos de Usuario</h2>
            </div>
            <div class="perfil" id="ContenedorPerfil">
                <span><u>Nombre/s:</u> ${perfil.name} - ${perfil.secondname} </span>
                </br>
                <span><u>Apellido:</u> ${perfil.lastname}</span>
                </br>
                <span><u>Correo Electronico:</u> ${email}</span>
                </br>
                <span><u>DNI:</u> ${perfil.documento}</span>
                </br>
                <span><u>Fecha de Nacimiento:</u> ${perfil.date}</span>
                </br>
                <span><u>Celular:</u> ${perfil.codArea}-${perfil.tel}</span>
                </br>
                <span><u>Nacionalidad:</u> ${perfil.nacionalidad}</span>
                </br>
                <span><u>Genero:</u> ${perfil.sexo}</span>
                </br>
                
            </div>
        </div>
        `
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      } ).catch((error) => {
         console.log("Error getting document:", error);
    });
    
    }
    else
    {

    }
})



