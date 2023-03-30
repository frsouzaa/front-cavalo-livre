function carregar_conteudo() {
    const produtos = get_produtos();
    localStorage.removeItem('produtos');
    localStorage.setItem("produtos", JSON.stringify(produtos));
    gerar_grid_produtos();
    gerar_lista_filtros();
    montar_paises()


    
    // tempusDominus.locale(tempusDominus.locales.ru.name)
    new tempusDominus.TempusDominus(document.getElementById('datetimepicker1'),
    {
    allowInputToggle: false,
    localization: {
        format: 'dd/MM/yyyy',
        locale: "pt-br"
    },
    // localization["locale"]: "pt-BR"
    })
    
    

}

function get_produtos() {
    // todo

    return [
        {
            id: "produto-1",
            nome: "Produto 1",
            preco: 10.0,
            categorias: []
        },
        {
            id: "teste-2",
            nome: "Teste 2",
            preco: 20.0,
            categorias: []
        },
        {
            id: "teste-3",
            nome: "Teste 3",
            preco: 30.0,
            categorias: []
        },
        {
            id: "produto-2",
            nome: "Produto 2",
            preco: 30.0,
            categorias: []
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
        <div class="div-card-produto col-md-4 d-block ${produtos[i].id}" onclick="abrir_produto()">
            <div class="produto">
                <div class="div-imagem">

                </div>
                <div class="interacao row">
                    <div class="informacoes col-md">                                    
                        <div class="nome-produto text-wrap fs-5">
                            ${produtos[i].nome}
                        </div>
                        <div class="preco-produto text-wrap text-uppercase fs-4">
                            R$ ${produtos[i].preco}
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

function abrir_produto() {
    console.log("todo");
}

function habilitar_filtro(element) {
    //element.classList.toggle("filtro-ativo");
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
    

    const colunas = 3;
    div_produtos_busca.innerHTML = `
    <div class="row">
        <h4 id="titulo-busca">
            <span id="icone-busca" class="material-symbols-outlined text-dark align-middle">
                search
            </span>
            Busca por: '${termo_buscado}'
        </h4>
    </div>
    `;
    gerar_grid("produtos-busca", produtos_filtrados, colunas)

    div_produtos_busca.classList.add("d-block");
    div_produtos_busca.classList.remove("d-none");
    div_produtos.classList.add("d-none");
    div_produtos.classList.remove("d-block");
}