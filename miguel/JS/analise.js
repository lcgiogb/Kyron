const video = document.getElementById("camera");
const mensagem = document.getElementById("mensagem");

async function iniciarCamera() {

    try {

        mensagem.innerText = "Solicitando acesso à câmera...";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;

        mensagem.innerText = "Câmera ativada!";

    } catch (erro) {

        console.error("Erro ao acessar a câmera:", erro);

        mensagem.innerText = "Não foi possível acessar a câmera.";

    }

}

iniciarCamera();