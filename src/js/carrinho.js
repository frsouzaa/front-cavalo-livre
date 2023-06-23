async function get_view_carrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    produtos = await get_produtos(Object.keys(carrinho));
    for (let i = 0; i < produtos.length; i++) {
        produtos[i].quantidade = carrinho[produtos[i].id]
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
    total.innerHTML = `Total: ${valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    const hrs = document.getElementsByClassName("hr-row-carrinho");
    const ultima_hr = hrs[hrs.length - 1];
    ultima_hr.parentNode.removeChild(ultima_hr);
}

function render_linha_carrinho(produto) {
    return `
    <div class="row row-produto-carrinho">
        <div class="col-md-6 d-block d-xl-flex">
            <div class="produto-carrinho d-flex justify-content-center">
                <div class="div-imagem-carrinho col-md-6">
                    <img class="imagem" src="${produto.imagens[0]}">
                </div>
            </div>
            <div class="d-flex p-2 p-xl-3 justify-content-center">
                <span class="fs-4 ">${produto.nome}</span>
            </div>
        </div>
        <div class="col-md-3 d-flex flex-column p-0 p-xl-3">
            <div class="mx-auto">
                <button class="btn arrow-btn ${produto.quantidade === 1 ? "invisible" : ""}" name="carrinho${produto.id}" onclick="diminue_quantidade(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#198754" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>
                <span class="mx-auto fs-5">${produto.quantidade}x</span>
                <button class="btn arrow-btn" name="carrinho${produto.id}" onclick="aumenta_quantidade(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#198754" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                </button>
            </div>
            <button class="mx-auto btn trash-btn" onclick="remove_produto_carrinho(this)" name="remove${produto.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        </div>
        <div class="col-md-3 d-flex flex-column p-0 p-xl-3">
            <span class="mx-auto fs-5" name="${produto.preco}">${(produto.preco*produto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> 
        </div>
        <hr class="hr-row-carrinho mt-3">
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
    const produto_adicionado = document.getElementsByClassName("produto-adicionado")[0];
    produto_adicionado.classList.toggle("d-none")
    setTimeout(() => {
        produto_adicionado.classList.toggle("d-none")
    }, 2000);
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    const id_produto = elemento.attributes.name.value;
    if (!carrinho) {
        localStorage.setItem("carrinho", `{"${id_produto}": 1}`);
        return;
    }
    if (Object.keys(carrinho).find(e => e === id_produto)) {
        carrinho[id_produto] += 1;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        return;
    }
    carrinho[id_produto] = 1;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function diminue_quantidade(elemento) {
    const id = elemento.attributes.name.value.replace("carrinho", "");
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho[id] === 1) return;
    carrinho[id] -= 1;
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    elemento.parentElement.children[1].innerText = `${carrinho[id]}x`
    if (carrinho[id] === 1) {
        elemento.classList.add("invisible");
    };
    const span_valor = elemento.parentElement.parentElement.parentElement.children[2].children[0];
    span_valor.innerText = Number(span_valor.attributes.name.value * carrinho[id]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ;
    atualiza_total();
}

function aumenta_quantidade(elemento) {
    const id = elemento.attributes.name.value.replace("carrinho", "");
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    carrinho[id] += 1;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    elemento.parentElement.children[0].classList.remove("invisible");
    elemento.parentElement.children[1].innerText = `${carrinho[id]}x`;
    const span_valor = elemento.parentElement.parentElement.parentElement.children[2].children[0];
    span_valor.innerText = Number(span_valor.attributes.name.value * carrinho[id]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    atualiza_total();
}

function atualiza_total() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    let valor_total = 0;
    Object.keys(carrinho).forEach(qc => {
        valor_total += produtos.filter(p => p.id === qc)[0].preco * carrinho[qc];
    })
    const total = document.getElementById("total")
    total.innerHTML = `Total: ${valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}

function remove_produto_carrinho(elemento) {
    const id = elemento.attributes.name.value.replace("remove", "");
    const row_carrinho = elemento.parentElement.parentElement;
    row_carrinho.parentNode.removeChild(row_carrinho);
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    delete carrinho[id];
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    const hrs = document.getElementsByClassName("hr-row-carrinho");
    const rows = document.getElementsByClassName("row-produto-carrinho");
    if (rows.length === hrs.length && hrs.length !== 0) {
        hrs[hrs.length-1].parentNode.removeChild(hrs[hrs.length-1]);
    }
    atualiza_total();
    if (JSON.stringify(carrinho) === JSON.stringify({})) {
        mostrar_div_principal("carrinho-vazio");
    }
}

async function finalizar() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        document.getElementById("confirmacao-msg").innerHTML = "Faça login para continuar";
        const modal = new bootstrap.Modal("#modal-confirmacao");
        modal.show();
        setTimeout(() => {
            modal.hide();
        }, 1500)
        return;
    }
    let produtos = [];
    for (key in carrinho) {
        produtos.push({
            "id": key,
            "quantidade": carrinho[key]
        })
    }
    while (true) {
        const data = {
            "data": {
                "usuario": usuario.email,
                "produtos": produtos
            }
        }
        const res = await fetch(`${base_url}/pedido`, 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${usuario.token}`
            }
        })
        .then(response => {
            return response
        })
        .catch(e => {
            return {
                "msg": "Erro"
            }
        });
    
        const msg = document.getElementById("confirmacao-msg");
        if (res.msg !== "Erro" && res.status == 200) {
            msg.innerHTML = "O seu pedido foi gravado com sucesso.";
        } else if (res.status == 401) {
            let data = {
                "data": {
                    "email": usuario.email,
                    "senhaC": usuario.senha
                }
            }
            const res = await fetch(`${base_url}/login`, 
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }
            )
            .then(response => {
                r = response.json();
                return r;
            })
            .catch(e => {
                console.log(e);
                return {
                    "menssagem": "login ou senha inválidos"
                };
            });
        
            if (res.data) {
                localStorage.setItem("usuario", JSON.stringify(res.data));
                usuario = JSON.parse(localStorage.getItem("usuario"));
                continue;
            } else {
                msg.innerHTML = "Erro ao gravar o pedido, tente novamente mais tarde."
            }
        } else {
            msg.innerHTML = "Erro ao gravar o pedido, tente novamente mais tarde."
        }
        break;
    }
    const modal = new bootstrap.Modal("#modal-confirmacao");
    modal.show();
    setTimeout(() => {
        modal.hide();
    }, 3000)
}