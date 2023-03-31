function carregar_conteudo() {
    const parametros = new URLSearchParams(window.location.search)
    if (parametros.get("produto")) {
        const div_produtos = document.getElementById("grid-produtos")
        div_produtos.classList.add("d-none");
        const div_detalhes_produto = document.getElementById("detalhes-produto")
        div_detalhes_produto.innerHTML = parametros.get("produto");
        return;
    }

    const produtos = get_produtos();
    localStorage.removeItem('produtos');
    localStorage.setItem("produtos", JSON.stringify(produtos));
    gerar_grid_produtos();
    gerar_lista_filtros();
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

function get_produtos() {
    // todo

    return [
        {
            id: "cavalo-lindo-bonito-cavalo",
            nome: "Cavalo lindo bonito cavalo",
            preco: 5089.0,
            categorias: [],
            url: "https://static.mundoeducacao.uol.com.br/mundoeducacao/2019/08/cavalo.jpg"
        },
        {
            id: "bota-estilosa",
            nome: "Bota estilosa",
            preco: 220.99,
            categorias: [],
            url: "data:image/jpeg;base64,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"
        },
        {
            id: "adubo",
            nome: "Adubo",
            preco: 89.90,
            categorias: [],
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc1iMiWyadD_sHnmo8RFJBN-T9GIWeRclhg&usqp=CAU"
        },
        {
            id: "trator-verde-legal",
            nome: "Trator verde legal",
            preco: 89574.56,
            categorias: [],
            url: "data:image/jpeg;base64,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"
        }
    ]
}

function gerar_grid_produtos() {
    const colunas = 3;
    gerar_grid("produtos", JSON.parse(localStorage.getItem('produtos')), colunas)
}

function gerar_grid(id_grid, produtos, quant_colunas) {
    const conteudo = document.getElementById(id_grid);
    const quant_produtos = produtos.length;
    const colunas = quant_colunas;
    const linhas = Math.ceil(quant_produtos/colunas); 
    for (let i = 0; i < linhas; i++) {
        conteudo.innerHTML += `
        <div class="row">
            ${gerar_cards(produtos.slice(colunas*i, (colunas*i)+colunas))}
        </div>
        `;
    }
}

function gerar_cards(produtos) {
    let cards = ``;
    for (let i = 0; i < produtos.length; i++) {
        cards = ` ${cards}
        <div class="div-card-produto col-lg-4 col-md-6 d-block col-sm-12" onclick="abrir_produto(this)" name="${produtos[i].id}">
            <div class="produto">
                <div class="div-imagem">
                    <img class="imagem" src="${produtos[i].url}">
                </div>
                <div class="interacao row">
                    <div class="informacoes col-md-12 col-sm-12">                                    
                        <div class="nome-produto text-wrap fs-5">
                            ${produtos[i].nome}
                        </div>
                        <div class="preco-produto text-wrap text-uppercase fs-4">
                            R$ ${produtos[i].preco.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    return cards;
}

function gerar_lista_filtros() {
    const lista = document.getElementById("lista-filtros");
    const filtros = ["Lorem", "ipsum", "dolor", "adipisicing", "Minima", "eveniet"]

    for (let i = 0; i < filtros.length; i++) {
        lista.innerHTML += `
        <button type="button" class="list-group-item list-group-item-action" onclick="habilitar_filtro(this)">
            ${filtros[i]}
        </button>
        `;
    }
}

function abrir_produto(elemento) {
    window.location.href = window.location.protocol + "//" +
    window.location.host +
    window.location.pathname +
    "?produto=" + elemento.attributes.name.value;

    console.log(window.location.protocol + "//" +
    window.location.host +
    window.location.pathname +
    "?produto=" + elemento.attributes.name.value);
}

function habilitar_filtro(element) {
    element.classList.toggle("active");
}

function montar_paises() {
    const paises = ["Afeganistão", "África do Sul", "Albânia", "Alemanha", "Andorra", "Angola", "Anguila", "Antártida", "Antígua e Barbuda", "Antilhas Holandesas", "Arábia Saudita", "Argélia", "Argentina", "Armênia", "Aruba", "Austrália", "Áustria", "Autoridade Palestina", "Azerbaijão", "Bahamas", "Bahrein", "Bangladesh", "Barbados", "Belarus", "Bélgica", "Belize", "Benin", "Bermuda", "Bolívia", "Bósnia e Herzegovina", "Botsuana", "Brasil", "Brunei", "Bulgária", "Burquina Faso", "Burundi", "Butão", "Cabo Verde", "Camarões", "Camboja", "Canadá", "Catar", "Cazaquistão", "Chade", "Chile", "China", "Chipre", "Cidade do Vaticano", "Cingapura", "Colômbia", "Comoros", "Congo", "Congo, República Democrática do", "Coreia", "Coreia do Norte", "Costa Rica", "Côte d'Ivoire (Costa do Marfim)", "Croácia", "Cuba", "Dinamarca", "Djibuti", "Dominica", "Egito", "El Salvador", "Emirados Árabes Unidos", "Equador", "Eritreia", "Eslováquia", "Eslovênia", "Espanha", "Estados Unidos", "Estônia", "Etiópia", "Filipinas", "Finlândia", "França", "Gabão", "Gâmbia", "Gana", "Geórgia", "Geórgia do Sul e Ilhas Sandwich do Sul", "Gibraltar", "Granada", "Grécia", "Groenlândia", "Guadalupe", "Guam", "Guatemala", "Guernsey", "Guiana", "Guiana Francesa", "Guiné", "Guiné Equatorial", "Guiné-Bissau", "Haiti", "Honduras", "Hong Kong S. A. R", "Hungria", "Iêmen", "Ilha Bouvet", "Ilha Christmas", "Ilha de Man", "Ilha Norfolk", "Ilhas Cayman", "Ilhas Cocos (Keeling)", "Ilhas Cook", "Ilhas Faroés", "Ilhas Fiji", "Ilhas Heard e Ilhas McDonald", "Ilhas Malvinas (Falkland Islands)", "Ilhas Marianas do Norte", "Ilhas Marshall", "Ilhas Salomão", "Ilhas Turks e Caicos", "Ilhas Virgens Americanas", "Ilhas Virgens Britânicas", "Índia", "Indonésia", "Irã", "Iraque", "Irlanda", "Islândia", "Israel", "Itália", "Jamaica", "Japão", "Jersey", "Jordânia", "Kiribati", "Kuaite", "Laos", "Lesoto", "Letônia", "Líbano", "Libéria", "Líbia", "Liechtenstein", "Lituânia", "Luxemburgo", "Macedônia, Antiga República Iugoslava da", "Madagascar", "Malásia", "Malaui", "Maldivas", "Mali", "Malta", "Marrocos", "Martinica", "Maurício", "Mauritânia", "Mayotte", "México", "Micronésia", "Moçambique", "Moldova", "Mônaco", "Mongólia", "Montenegro", "Montserrat", "Myanma", "Namíbia", "Nauru", "Nepal", "Nicarágua", "Níger", "Nigéria", "Niue", "Noruega", "Nova Caledônia", "Nova Zelândia", "Omã", "Países Baixos", "Palau", "Panamá", "Papua-Nova Guiné", "Paquistão", "Paraguai", "Peru", "Pitcairn", "Polinésia Francesa", "Polônia", "Porto Rico", "Portugal", "Quênia", "Quirguistão", "RAE de Macau", "Reino Unido", "República Centro-Africana", "República Dominicana", "República Tcheca", "Reunião", "Romênia", "Ruanda", "Rússia", "Saint-Pierre e Miquelon", "Samoa", "Samoa Americana", "San Marino", "Santa Helena", "Santa Lúcia", "São Tomé e Príncipe", "São Vicente e Granadinas", "Seicheles", "Senegal", "Serra Leoa", "Sérvia", "Síria", "Somália", "Sri Lanka", "St. Kitts e Névis", "Suazilândia", "Sudão", "Suécia", "Suíça", "Suriname", "Svalbard", "Tagiquistão", "Tailândia", "Taiwan", "Tanzânia", "Terras Austrais e Antárticas Francesas", "Território Britânico do Oceano Índico", "Territórios Insulares dos EUA", "Timor Leste", "Togo", "Tokelau", "Tonga", "Trinidad e Tobago", "Tunísia", "Turcomenistão", "Turquia", "Tuvalu", "Ucrânia", "Uganda", "Uruguai", "Uzbequistão", "Vanuatu", "Venezuela", "Vietnã", "Wallis e Futuna", "Zâmbia", "Zimbábue"]
    const select_paises = document.getElementById("pais");
    for (let i = 0; i < paises.length; i++) {
        let option = new Option(paises[i], paises[i])
        select_paises.add(option);
    }
    select_paises.value = "Brasil"
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
    gerar_grid("produtos-busca", produtos_filtrados, colunas)

    div_produtos_busca.classList.add("d-block");
    div_produtos_busca.classList.remove("d-none");
    div_produtos.classList.add("d-none");
    div_produtos.classList.remove("d-block");
}