function get_view_detalhes(parametros) {
    const produto = get_detalhes_produto(parametros.get("produto"));
    render_detalhes(produto);
    return;
}

function render_detalhes(produto) {
    const indicadores = document.getElementById("indicadores");
    const imagens = document.getElementById("imagens");
    const titulo = document.getElementById("produto-nome");
    const preco = document.getElementById("produto-preco");
    const descricao = document.getElementById("produto-descricao");
    const informacoes_produto = document.getElementById("informacoes-produto")
    
    titulo.innerHTML = produto.nome;
    preco.innerHTML = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    descricao.innerHTML = produto.descricao;
    informacoes_produto.innerHTML += `<button class="btn-filtros btn btn-success" type="button" name="${produto.id}" onclick="adiciona_produto_carrinho(this)">Adicionar ao carrinho</button><br><br><br><br>`;

    let conteudo_imagens = ``;
    produto.imagens.forEach((link) => {
        conteudo_imagens = `
            ${conteudo_imagens}
            <div class="carousel-item">
                <div class="item-carrosel">
                    <img src="${link}" class="imagem d-block w-100">
                </div>
            </div>
        `;
    });
    imagens.innerHTML = conteudo_imagens;

    let conteudo_indicadores = ``;
    for (let i = 0; i < produto.imagens.length; i++) {
        conteudo_indicadores = `
            ${conteudo_indicadores}
            <button type="button" data-bs-target="#carrosel" data-bs-slide-to="${i}" class="indicador"></button>
        `;
    }
    indicadores.innerHTML = conteudo_indicadores;

    document.getElementsByClassName("carousel-item")[0].classList.add("active")
    document.getElementsByClassName("indicador")[0].classList.add("active")
}
