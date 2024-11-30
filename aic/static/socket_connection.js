const socket_url = "127.0.0.1:8000";
appareil_connected = []
let pElement = document.querySelector('.devise-connected');
let id_classe = document.querySelector("#id_classe").value

function newConnection() {
    // Initialiser une connexion WebSocket avec l'URL correcte
    const socket = new WebSocket(`ws://${socket_url}/ws/new_connection/pc_imei/`);

    // Lorsque la connexion est ouverte
    socket.onopen = function(event) {
        console.log('Connexion WebSocket ouverte.');
    };

    socket.onmessage = function(event) {
        try {
            appareil_connected = []
            let data = JSON.parse(event.data);
            console.log(data)
            if (data.connected_clients){
                let clients = data.connected_clients;

                //j'efface tout les appareil afficher a ecrans
                pElement.innerHTML = ""
                clients.forEach(function(client) {
                    appareil_connected.push(client)
                    console.log(typeof(client))
                    add_connected_devise(client)
                });
            }
            
        } catch (error) {
            console.error('Erreur lors du parsing du JSON:', error);
        }
        nextManagement();
    };

    // Lorsque la connexion est fermée
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log('Connexion fermée proprement.');
        } else {
            console.log('Connexion interrompue');  // ex: perte de connexion
        }
        console.log('Code :', event.code, 'Raison :', event.reason);
    };

    // Gestion des erreurs de connexion
    socket.onerror = function(error) {
        console.error('Erreur WebSocket :', error);
    };
}

//affiche les appareil connecte
function add_connected_devise(devise){

    mydiv = document.createElement('div')
    text_devise = `

        <div class="card-body">
            <div class="d-flex align-items-center">
            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="ri-mac-line"></i>
            </div>
            <div class="ps-3">
                 <h6>${devise}</h6>
                <span class="text-muted small pt-2 ps-1">devise</span>
            </div>
            </div>

        </div>
    `
    mydiv.innerHTML = text_devise

    // text_devise = document.createTextNode(text_devise)
    pElement.appendChild(mydiv);
}

//function qui verifie si tout les appareil sont connecter normalement avant de poursuivre la suite
function nextManagement(){
    if(appareil_connected.length >= 2){
        let nextButton  = document.querySelector("#next")
        nextButton.innerHTML = `
        <div class="d-flex justify-content-end">
            <a href="${window.location.protocol}//${window.location.host}/Management/connected_devise/recording/${id_classe}/"  class="btn btn-primary">Suivant <i class="bi bi-next me-1"></i></a>
        </div>
            `;
    }else{
        let nextButton  = document.querySelector("#next")
        nextButton.innerHTML = ``;
    }
}

async function verifications(){
    await nextManagement();
    await newConnection();
}

verifications()