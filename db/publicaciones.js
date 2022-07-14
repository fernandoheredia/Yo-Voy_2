const fs = firebase.firestore();
const auth = firebase.auth();



const logout = document.querySelector("#logout")
logout.addEventListener('click',()=>{
  auth.signOut()
  alert("Sesion Finalizada.")
})
const ContenedorAnuncios = document.getElementById("ContenedorAnuncios");
const onGetPublicaciones = (callback) => fs.collection("Publicaciones").onSnapshot(callback);
const deleteAnuncio = id => fs.collection('Publicaciones').doc(id).delete();


window.addEventListener("DOMContentLoaded", async(e) => {
     onGetPublicaciones((querySnapshot) => {
        ContenedorAnuncios.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            anuncio.id = doc.id;
            
            if (auth.currentUser.email == anuncio.fk_email){
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
                        <h5 class="card-text">Salida: ${anuncio.horaSalida}</h5>
                        <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" id="btn-Modificar">
                                    <span class="d-flex align-items-center">
                                        <span class="small btn-delete" data-id="${anuncio.id}">Eliminar</span>
                                    </span>
                                </button>
                        </div>
                    </div>
                </div>
                </div>

            `;
               //Funcion DELETE
        const btnsDelete = document.querySelectorAll('.btn-delete');
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', async (e) => {
            console.log(e.target.dataset.id)
            await deleteAnuncio(e.target.dataset.id)
            
        })
        })


            }
            
        });
    })
});