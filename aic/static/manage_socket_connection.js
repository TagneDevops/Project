const socket_url ="127.0.0.1:8000"
const socket = new WebSocket(`ws://${socket_url}/ws/start_photos/pc_imei/`);
let allNameEleve = document.querySelector('tbody').children
let message_response = ''


async function sendMessage(socket, message) {
    console.log("ma nouvelle requette est envoyer")
    console.log(message)
    return new Promise((resolve, reject) => {
        // Écouter le message du serveur
        socket.onmessage = function(event) {
            resolve(event.data); // Résoudre la promesse avec les données reçues
        };

        // Envoyer le message au serveur
        socket.send(JSON.stringify(message));

        // Gestion des erreurs
        socket.onerror = function(error) {
            reject('Erreur WebSocket : ' + error.message);
        };

        // Gestion de la fermeture de la connexion
        socket.onclose = function(event) {
            if (!event.wasClean) {
                reject('Connexion fermée de manière inattendue');
            }
        };
    });
}


socket.onopen =  async function() {

    async function managementMessage() {
        // Utilisation de Array.from pour convertir le HTMLCollection en un tableau
        for (let row of Array.from(allNameEleve)) {
            let id = row.children[0].textContent.trim();    
            let name = row.children[1].textContent.trim();  
    
            const message = {
                type: 'pc',
                id: id,
                nom: name
            };
    
            try {
                // Attendre la réponse avant de continuer à la prochaine itération
                message_response = JSON.stringify(message)
                if (message_response.connected_clients){
                    
                }else{
                    let response = await sendMessage(socket, message);
                    console.log('Réponse du serveur :', response);
                }
                
                console.log("la photo a ete recuperer avec success")
            } catch (error) {
                console.error('Erreur :', error);
            }
        }
    }
    

    await managementMessage()


    
};

