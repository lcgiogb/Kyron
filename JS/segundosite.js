
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
        const aberto = menu.classList.toggle("aberto");

        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

        menuToggle.textContent = aberto ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("aberto");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
            menuToggle.textContent = "☰";
        });
    });
}

const formContato = document.getElementById("formContato");
const mensagemStatus = document.getElementById("mensagemStatus");

if (formContato && mensagemStatus) {
    formContato.addEventListener("submit", function (event) {
        event.preventDefault();

        mensagemStatus.textContent =
            "Mensagem preenchida! O envio real precisa de um serviço de formulário.";

        formContato.reset();
    });
}
