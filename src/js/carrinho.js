function get_view_carrinho(parametros) {
    produtos = [];
    parametros = parametros.split(";")
    parametros.forEach(e => {
        e = e.split(">");
        produtos.push(e[0])
    })
    produtos = get_produtos(produtos);

    for (let i = 0; i < produtos.length; i++) {
        produtos[i].quantidade = parametros[i].split(">")[1]
    }
    render_carrinho(produtos);
}

function render_carrinho(produtos) {
    const tab_carrinho = document.getElementById("tab-carrinho");
    let valor_total = 0;
    produtos.forEach(p => {
        valor_total += p.preco * p.quantidade;
        tab_carrinho.innerHTML += `${render_linha_carrinho(p)}`;
    });
    const total = document.getElementById("total")
    total.innerHTML = valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function render_linha_carrinho(produto) {
    return `
    <div class="row row-produto-carrinho">
        <div class="col-md-6 d-flex">
            <div class="produto-carrinho d-flex">
                <div class="div-imagem-carrinho col-md-6">
                    <img class="imagem" src="${produto.imagem}">
                </div>
            </div>
            <div class="d-flex">
                <span class="fs-4 nome-produto-carrinho">${produto.nome}</span>
            </div>
        </div>
        <div class="quantidade-carrinho col-md-3">
            <span class="mx-auto fs-5">${produto.quantidade}x</span>
        </div>
        <div class="valor-carrinho col-md-3">
            <span class="mx-auto fs-5">${(produto.preco*produto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> 
        </div>
    </div>
    `
}

function abrir_carrinho() {
    let produtos = "";

    const quantidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    Object.keys(quantidade_carrinho).forEach(key => {
        produtos = `${produtos}${key}>${quantidade_carrinho[key]};`
    })

    produtos = produtos.slice(0, -1)

    window.location.href = window.location.protocol + "//" +
        window.location.host +
        window.location.pathname +
        "?carrinho=" + produtos;
}

function adiciona_produto_carrinho(elemento) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    const id_produto = elemento.attributes.name.value;
    if (!carrinho) {
        localStorage.setItem("carrinho", JSON.stringify([id_produto]));
        localStorage.setItem("quantidade_carrinho", `{"${id_produto}": 1}`);
        return;
    }
    if (carrinho.find(e => e === id_produto)) {
        let quanidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
        quanidade_carrinho[id_produto] += 1;
        localStorage.setItem("quantidade_carrinho", JSON.stringify(quanidade_carrinho));
        return;
    }
    carrinho.push(id_produto)
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    let quanidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    quanidade_carrinho[id_produto] = 1;
    localStorage.setItem("quantidade_carrinho", JSON.stringify(quanidade_carrinho));
}