const fs = firebase.firestore();
const auth = firebase.auth();
const logout = document.querySelector("#logout")
logout.addEventListener('click',()=>{
  auth.signOut()
  alert("Sesion Finalizada.")
})

const ContenedorAnuncios = document.getElementById("ContenedorAnuncios");
const onGetPublicaciones = (callback) => fs.collection("PublicacionesHosp").onSnapshot(callback);
const deleteAnuncio = id => fs.collection('PublicacionesHosp').doc(id).delete();

window.addEventListener("DOMContentLoaded", async(e) => {
    onGetPublicaciones((querySnapshot) => {
        ContenedorAnuncios.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            anuncio.id = doc.id;

           if (auth.currentUser.email == anuncio.fk_email){
                ContenedorAnuncios.innerHTML += ` <div class="card-resultado" >
                      
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
                            <h5 class="card-text "">Ubicacion: ${anuncio.origen}-${anuncio.origen}</h5>
                            <h5 class="card-text">Dias Disponibles</h5>
                            <h5 class="card-text">desde: ${anuncio.desde}</h5>
                            <h5 class="card-text">hasta: ${anuncio.hasta}</h5>
                            <h5 class="card-text">Lugares disponibles: ${anuncio.personasH}</h5>
                            <h5 class="card-text">Tel: ${anuncio.telefonoH}</h5>
                            <h5 class="card-text">Descripcion: ${anuncio.descripcionH}</h5>
                            <button class="estiloboton btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0 mr-3" id="btn-Modificar">
                                    <span class="d-flex align-items-center">
                                        <span class="small btn-delete" data-id="${anuncio.id}">Eliminar</span>
                                    </span>
                                </button>
                        
                        </div>
                </div>
                
                </br>
                </br>
    
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