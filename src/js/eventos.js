function abrir_produto(elemento) {
    window.location.href = window.location.protocol + "//" +
    window.location.host +
    window.location.pathname +
    "?produto=" + elemento.attributes.name.value;
}

function habilitar_filtro(elemento) {
    elemento.classList.toggle("active");
    elemento.classList.toggle("filtro-ativo");
}

function handle_lupa_buscar() {
    const pesquisa = document.getElementById("input-pesquisar");
    localStorage.setItem("termo_busca", pesquisa.value);
    busca()
}

function busca(key="Enter") {
    if (key !== "Enter") {
        return;
    }

    let termo_buscado = document.getElementById("input-pesquisar").value;
    
    const abc = document.getElementsByClassName("filtro-ativo");
    let filtros_ativos = [];
    for (let i = 0; i < abc.length; i++) {
        filtros_ativos.push(abc[i].attributes.name.value);
    }

    const div_produtos_busca = document.getElementById("produtos-busca")
    const div_produtos = document.getElementById("produtos")
    div_produtos_busca.innerHTML = "";
    if (!filtros_ativos.length && !termo_buscado) {
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
        const categorias = produto.categorias;
        if (!filtros_ativos.length && termo_buscado && nome_produto.includes(termo_buscado.toLocaleLowerCase())) {
            produtos_filtrados.push(produto);
        }
        else if (filtros_ativos.length && !termo_buscado && JSON.stringify(filtros_ativos.filter(item => categorias.includes(item))) !== JSON.stringify([])) {
            produtos_filtrados.push(produto);
        }
        else if (JSON.stringify(filtros_ativos.filter(item => categorias.includes(item))) !== JSON.stringify([]) && nome_produto.includes(termo_buscado.toLocaleLowerCase())) {
            produtos_filtrados.push(produto);
        }
    }); 

    if (termo_buscado) {
        div_produtos_busca.innerHTML = `
        <div class="row">
            <h4 id="titulo-busca" class="text-dark">
                <span id="icone-busca" class="material-symbols-outlined align-middle">
                    search
                </span>
                Buscando por: ${termo_buscado} (${produtos_filtrados.length})
                <a class="fechar-busca" onclick="fechar_busca()">
                    <span class="material-symbols-outlined align-middle">
                        close
                    </span>
                </a>
            </h4>
        </div>
        `;
    }

    render_grid("produtos-busca", produtos_filtrados)

    div_produtos_busca.classList.add("d-block");
    div_produtos_busca.classList.remove("d-none");
    div_produtos.classList.add("d-none");
    div_produtos.classList.remove("d-block");

    const nav = document.getElementById("navbar-collapse");
    const nav_collapse = document.getElementById("navbar-collapse")
    if (nav_collapse.className.split(" ").find(e => e === "show")) {
        const collapse = new bootstrap.Collapse(nav);
        collapse.toggle();
    }
}

function fechar_busca() {
    document.getElementById("input-pesquisar").value = "";
    busca();
}

function abrir_inicio() {
    window.location.href = window.location.protocol + "//" +
    window.location.host +
    window.location.pathname;
}