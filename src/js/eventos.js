function abrir_produto(elemento) {
    window.location.href = window.location.protocol + "//" +
        window.location.host +
        window.location.pathname +
        "?produto=" + elemento.attributes.name.value;
}

function habilitar_filtro(element) {
    element.classList.toggle("active");
}

function busca(key, elemento) {
    if (key !== "Enter") {
        return;
    }

    const termo_buscado = elemento.value;

    const div_produtos_busca = document.getElementById("produtos-busca")
    const div_produtos = document.getElementById("produtos")
    div_produtos_busca.innerHTML = "";
    if (!termo_buscado) {
        div_produtos_busca.classList.add("d-none");
        div_produtos_busca.classList.remove("d-block");
        div_produtos.classList.add("d-block");
        div_produtos.classList.remove("d-none");
        return;
    }

    const produtos = JSON.parse(localStorage.getItem('produtos'));

    let produtos_filtrados = [];

    produtos.forEach((produto) => {
        const nome_produto = produto.nome.toLowerCase();
        if (nome_produto.includes(termo_buscado.toLocaleLowerCase())) {
            produtos_filtrados.push(produto);
        }
    });


    div_produtos_busca.innerHTML = `
    <div class="row">
    <h4 id="titulo-busca">
    <span id="icone-busca" class="material-symbols-outlined text-dark align-middle">
    search
    </span>
    Buscando por: ${termo_buscado} (${produtos_filtrados.length})
    </h4>
    </div>
    `;
    const colunas = 3;
    render_grid("produtos-busca", produtos_filtrados, colunas)

    div_produtos_busca.classList.add("d-block");
    div_produtos_busca.classList.remove("d-none");
    div_produtos.classList.add("d-none");
    div_produtos.classList.remove("d-block");
}