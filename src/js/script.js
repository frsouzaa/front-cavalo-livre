function carregar_conteudo() {
    const conteudo = document.getElementsByClassName("produtos")[0];
    const linhas = 7; 
    for (let i = 0; i < linhas; i++) {
        conteudo.innerHTML += `
        <div class="row">
            ${gerar_cards(3)}
        </div>
        `;
    }
}

function gerar_cards(quantidade) {
    let cards = ``;
    for (let i = 0; i < quantidade; i++) {
        cards = ` ${cards}
        <div class="div-card-produto col-md-4" onclick="abrir_produto()">
            <div class="produto">
                <div class="div-imagem">

                </div>
                <div class="interacao row">
                    <div class="informacoes col-md">                                    
                        <div class="nome-produto text-wrap fs-5">
                            Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div class="preco-produto text-wrap text-uppercase fs-4">
                            R$ 0,00
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    return cards;
}

function abrir_produto() {
    console.log("oi")
}