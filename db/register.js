//const fs = firebase.firestore();
//const Usuariodb = document.getElementById("signup-form");

//const saveUsuario = (name, secondname,lastname,date,sexo,nacionalidad,documento,codArea,tel,) =>
//fs.collection("Usuario").doc().set({
//    name,
//    secondname,
//    lastname,
//    date,
//    sexo,
//    nacionalidad,
//    documento,
//    codArea,
//    tel,
//})


//Usuariodb.addEventListener("submit", async (e)=> {
//    e.preventDefault();
//
//    const name = Usuariodb ["signup-firstName"].value;
//    const secondname = Usuariodb ["signup-secondtName"].value;
//    const lastname = Usuariodb ["signup-lastName"].value;
//    const date = Usuariodb ["signup-date"].value;
//    const sexo = Usuariodb ["signup-sexo"].value;
//    const nacionalidad = Usuariodb ["signup-nacionalidad"].value;
//    const documento = Usuariodb ["signup-documento"].value;
//    const codArea = Usuariodb ["signup-codigoArea"].value;
//    const tel = Usuariodb ["signup-tel"].value;
//
//
//    await saveUsuario(name,secondname,lastname,date,sexo,nacionalidad,
//                      documento,codArea,tel)
//    Usuariodb.reset();
//    alert("Datos personales cargados con Exito!",e.message);
//    
//    console.log(name,secondname,lastname,date,sexo,nacionalidad,
//               documento,codArea,tel)
//});

var valid = new Boolean(false);
const Usuariodb = document.querySelector("#signup-form");
Usuariodb.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = Usuariodb["signup-email"].value;
  const password = Usuariodb["signup-password"].value;
  
  
  
   const fs = firebase.firestore();
  // Authenticate the User
  auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
    return fs.collection('Usuario').doc(userCredential.user.uid).set({
      name: Usuariodb["signup-firstName"].value,
      secondname: Usuariodb ["signup-secondtName"].value,
      lastname:Usuariodb ["signup-lastName"].value,
      date:Usuariodb ["signup-date"].value,
      sexo: Usuariodb ["signup-sexo"].value,
      nacionalidad:Usuariodb ["signup-nacionalidad"].value ,
      documento: Usuariodb ["signup-documento"].value,
      codArea:Usuariodb ["signup-codigoArea"].value,
      tel:Usuariodb ["signup-tel"].value 
      });
    }).then(()=>{
      // clear the form
      Usuariodb.reset();
      // close the modal
      console.log(email,password)
      alert("Regitrado con exito",e.message);
      location.href="index.html";
    });
       
});
 




