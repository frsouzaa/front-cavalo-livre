function get_view_carrinho() {
    let quantidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    produtos = get_produtos(Object.keys(quantidade_carrinho));
    for (let i = 0; i < produtos.length; i++) {
        produtos[i].quantidade = quantidade_carrinho[produtos[i].id]
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
    const hrs = document.getElementsByClassName("hr-row-carrinho");
    const ultima_hr = hrs[hrs.length - 1];
    ultima_hr.parentNode.removeChild(ultima_hr);
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
        <div class="quantidade-carrinho col-md-3 d-flex">
            <div class="mx-auto">
                <button class="btn arrow-btn ${produto.quantidade === 1 ? "invisible" : ""}" name="carrinho${produto.id}" onclick="diminue_quantidade(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#198754" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                    </svg>
                </button>
                <span class="mx-auto fs-5">${produto.quantidade}x</span>
                <button class="btn arrow-btn" name="carrinho${produto.id}" onclick="aumenta_quantidade(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#198754" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                    </svg>
                </button>
            </div>
            <button class="mx-auto btn trash-btn" onclick="remove_produto_carrinho(this)" name="remove${produto.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#dd1a00" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        </div>
        <div class="valor-carrinho col-md-3">
            <span class="mx-auto fs-5" name="${produto.preco}">${(produto.preco*produto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> 
        </div>
        <hr class="hr-row-carrinho">
    </div>
    `
}

function abrir_carrinho() {
    window.location.href = window.location.protocol + "//" +
        window.location.host +
        window.location.pathname +
        "?carrinho=0";
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

function diminue_quantidade(elemento) {
    const id = elemento.attributes.name.value.replace("carrinho", "");
    const quantidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    if (quantidade_carrinho[id] === 1) return;
    quantidade_carrinho[id] -= 1;
    localStorage.setItem("quantidade_carrinho", JSON.stringify(quantidade_carrinho))
    elemento.parentElement.children[1].innerText = `${quantidade_carrinho[id]}x`
    if (quantidade_carrinho[id] === 1) {
        elemento.classList.add("invisible");
    };
    const span_valor = elemento.parentElement.parentElement.parentElement.children[2].children[0];
    span_valor.innerText = Number(span_valor.attributes.name.value * quantidade_carrinho[id]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
    atualiza_total();
}

function aumenta_quantidade(elemento) {
    const id = elemento.attributes.name.value.replace("carrinho", "");
    const quantidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    quantidade_carrinho[id] += 1;
    localStorage.setItem("quantidade_carrinho", JSON.stringify(quantidade_carrinho));
    elemento.parentElement.children[0].classList.remove("invisible");
    elemento.parentElement.children[1].innerText = `${quantidade_carrinho[id]}x`;
    const span_valor = elemento.parentElement.parentElement.parentElement.children[2].children[0];
    span_valor.innerText = Number(span_valor.attributes.name.value * quantidade_carrinho[id]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    atualiza_total();
}

function atualiza_total() {
    const quantidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    let valor_total = 0;
    Object.keys(quantidade_carrinho).forEach(qc => {
        valor_total += produtos.filter(p => p.id === qc)[0].preco * quantidade_carrinho[qc];
    })
    const total = document.getElementById("total")
    total.innerHTML = valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function remove_produto_carrinho(elemento) {
    const id = elemento.attributes.name.value.replace("remove", "");
    const row_carrinho = elemento.parentElement.parentElement;
    row_carrinho.parentNode.removeChild(row_carrinho);
    const quantidade_carrinho = JSON.parse(localStorage.getItem("quantidade_carrinho"));
    delete quantidade_carrinho[id];
    localStorage.setItem("quantidade_carrinho", JSON.stringify(quantidade_carrinho));
    if (Object.keys(quantidade_carrinho).lengh === 1) {
        const hrs = document.getElementsByClassName("hr-row-carrinho");
        const ultima_hr = hrs[hrs.length - 1];
        ultima_hr.parentNode.removeChild(ultima_hr);
    }
}