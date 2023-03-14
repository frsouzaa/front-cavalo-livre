function carregar_conteudo() {
    const conteudo = document.getElementById("content");
    for (let i = 0; i < 10; i++) {
        conteudo.innerHTML += `
        <div class="row">
            <div class="div-card-produto col-md-3">
                <div class="produto"></div>
            </div>
            <div class="div-card-produto col-md-3">
                <div class="produto"></div>
            </div>
            <div class="div-card-produto col-md-3">
                <div class="produto"></div>
            </div>
            <div class="div-card-produto col-md-3">
                <div class="produto"></div>
            </div>
        </div>
        `;
    }
}
