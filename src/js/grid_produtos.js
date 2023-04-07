function get_view_grid_produtos() {
    const produtos = get_produtos();
    localStorage.removeItem('produtos');
    localStorage.setItem("produtos", JSON.stringify(produtos));
    render_grid_produtos();
    render_lista_filtros();
    montar_paises()

    new tempusDominus.TempusDominus(document.getElementById('datetimepicker1'),
    {
        allowInputToggle: false,
        localization: {
            format: 'dd/MM/yyyy',
            locale: "pt-br"
        },
    })
}

function render_grid_produtos() {
    const colunas = 3;
    render_grid("produtos", JSON.parse(localStorage.getItem('produtos')), colunas)
}

function render_grid(id_grid, produtos, quant_colunas) {
    const conteudo = document.getElementById(id_grid);
    const quant_produtos = produtos.length;
    const colunas = quant_colunas;
    const linhas = Math.ceil(quant_produtos / colunas);
    for (let i = 0; i < linhas; i++) {
        conteudo.innerHTML += `
        <div class="row">
            ${render_cards(produtos.slice(colunas * i, (colunas * i) + colunas))}
        </div>
        `;
    }
}

function render_cards(produtos) {
    let cards = ``;
    for (let i = 0; i < produtos.length; i++) {
        cards = ` ${cards}
        <div class="div-card-produto col-12 col-md-6 col-lg-4 d-block" onclick="abrir_produto(this)" name="${produtos[i].id}">
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