function get_view_grid_produtos() {
    const produtos = get_produtos();
    localStorage.removeItem('produtos');
    localStorage.setItem("produtos", JSON.stringify(produtos));
    render_grid_produtos();
    render_lista_filtros();
}

function render_grid_produtos() {
    render_grid("produtos", JSON.parse(localStorage.getItem('produtos')))
}

function render_grid(id_grid, produtos) {
    const conteudo = document.getElementById(id_grid);
    conteudo.innerHTML += `
        <div class="row">
            ${render_cards(produtos)}
        </div>
    `;
}

function render_cards(produtos) {
    let cards = ``;
    for (let i = 0; i < produtos.length; i++) {
        cards = ` ${cards}
        <div class="div-card-produto col-12 col-md-6 col-xxl-4 d-block" onclick="abrir_produto(this)" name="${produtos[i].id}">
            <div class="produto">
                <div class="div-imagem">
                    <img class="imagem" src="${produtos[i].imagem}">
                </div>
                <div class="interacao row">
                    <div class="informacoes col-12">                                    
                        <div class="nome-produto text-wrap fs-5">
                            ${produtos[i].nome}
                        </div>
                        <div class="preco-produto text-wrap text-uppercase fs-4">
                            ${produtos[i].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    return cards;
}