async function carregar_conteudo() {
    // handle_valida_usuario();
    const parametros = new URLSearchParams(window.location.search)
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho instanceof Array || !carrinho) {
        carrinho = {};
        localStorage.removeItem("carrinho")
    }
    if (parametros.get("produto")) {
        await get_view_detalhes(parametros);
        mostrar_div_principal("detalhes-produto");
    } else if(parametros.get("carrinho")) {
        if (JSON.stringify(carrinho) === JSON.stringify({})) {
            mostrar_div_principal("carrinho-vazio")
        } else {
            await get_view_carrinho();
            mostrar_div_principal("carrinho")
        }
    } else {
        const pesquisa = document.getElementById("pesquisa");
        pesquisa.classList.remove("d-none");
        await get_view_grid_produtos();
        mostrar_div_principal("grid-produtos")
    }

    montar_paises()
    new tempusDominus.TempusDominus(document.getElementById('datetimepicker1'),
    {
        allowInputToggle: false,
        localization: {
            format: 'dd/MM/yyyy',
            locale: "pt-br"
        },
        restrictions: {
            maxDate: new Date()
        }
    })

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    
    const max_z_index = get_max_z_index()

    const nav = document.getElementById("nav");
    nav.style = `z-index: ${max_z_index+1}`;

    const filtros = document.getElementsByClassName("offcanvas")[0];
    filtros.style = `z-index: ${max_z_index+2}`;

    const cadastro = document.getElementById("cadastro");
    cadastro.style = `z-index: ${max_z_index+3}`;

    const login = document.getElementById("login");
    login.style = `z-index: ${max_z_index+4}`;

    login.addEventListener("hide.bs.modal", () => {
        limpar_formularios();
    })

    const carregando = document.getElementById("carregando-conteudo");
    carregando.classList.add("d-none");
}

function handle_valida_usuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const nav_carrinho = document.getElementById("nav-carrinho");
    const perfil = document.getElementById("perfil");
    const perfil_login = document.getElementById("perfil-login");
    const btn_perfil = document.getElementById("btn-perfil");
    const label_perfil = document.getElementById("label-perfil");

    if (!usuario) {
        nav_carrinho.classList.remove("d-none");
        perfil.classList.remove("d-none");
        return;
    }
    res = valida_usuario_api(usuario.token);
    
    if (res) {
        perfil_login.classList.remove("d-none");
        perfil.classList.add("d-none");
        btn_perfil.innerHTML = `Olá, ${res.nome}`;
        label_perfil.classList.remove("d-none");
        label_perfil.innerHTML = `Olá, ${res.nome}`;
    } else {
        nav_carrinho.classList.remove("d-none");
        perfil.classList.remove("d-none");
        const modal = new bootstrap.Modal("#modal-sessao-expirada");
        modal.show();
        localStorage.removeItem("usuario");
    }

}

function valida_usuario_api(token) {
    // todo

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const agora = new Date();
    const login = new Date(token);
    if ((agora.getTime() - login.getTime()) / 1000 < 120) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === usuario.email) {
                return users[i];
            }
        }
    }
}

async function get_produtos(lista_produtos)  {
    if (!lista_produtos) {
        lista_produtos = [];
    }
    let response = await fetch(`${base_url}/produtos?produto=${lista_produtos.join('-')}`, {method: "GET"})
    .then(response => {
        return response.json();
    })
    .catch(e => {
        console.log(e);
        return {
            "data": []
        };
    });
    let categorias = [];
    response["data"].forEach(p => {
        p.categorias.forEach(c => {
            if (categorias.indexOf(c) === -1) {
                categorias.push(c);
            }
        });
    });
    localStorage.setItem("categorias", JSON.stringify(categorias));
    return response["data"]
}

function render_lista_filtros() {
    const lista = document.getElementById("lista-filtros");
    const filtros = JSON.parse(localStorage.getItem("categorias"))
    const lista_mobile = document.getElementById("lista-filtros-mobile");

    for (let i = 0; i < filtros.length; i++) {
        lista.innerHTML += `
        <button name="${filtros[i]}" type="button" class="list-group-item list-group-item-action" onclick="habilitar_filtro(this)">
            ${filtros[i]}
        </button>
        `;
        lista_mobile.innerHTML += `
        <button name="${filtros[i]}" type="button" class="list-group-item list-group-item-action" onclick="habilitar_filtro(this)">
            ${filtros[i]}
        </button>
        `;
    }
    lista.innerHTML += `
    <div class="row mt-3"> 
        <div class="col-3"></div> 
        <button class="btn btn-success col-6" onclick="busca()">
            Aplicar Filtros
        </button> 
        <div class="col-3"></div> 
    </div
    <br>
    <div class="row mt-3"> 
        <div class="col-3"></div> 
        <button class="btn btn-dark col-6" onclick="remover_filtros()">
            Remover Filtros
        </button> 
        <div class="col-3"></div> 
    </div>
    `;
}

function montar_paises() {
    const paises = ["Afeganistão", "África do Sul", "Albânia", "Alemanha", "Andorra", "Angola", "Anguila", "Antártida", "Antígua e Barbuda", "Antilhas Holandesas", "Arábia Saudita", "Argélia", "Argentina", "Armênia", "Aruba", "Austrália", "Áustria", "Autoridade Palestina", "Azerbaijão", "Bahamas", "Bahrein", "Bangladesh", "Barbados", "Belarus", "Bélgica", "Belize", "Benin", "Bermuda", "Bolívia", "Bósnia e Herzegovina", "Botsuana", "Brasil", "Brunei", "Bulgária", "Burquina Faso", "Burundi", "Butão", "Cabo Verde", "Camarões", "Camboja", "Canadá", "Catar", "Cazaquistão", "Chade", "Chile", "China", "Chipre", "Cidade do Vaticano", "Cingapura", "Colômbia", "Comoros", "Congo", "Congo, República Democrática do", "Coreia", "Coreia do Norte", "Costa Rica", "Côte d'Ivoire (Costa do Marfim)", "Croácia", "Cuba", "Dinamarca", "Djibuti", "Dominica", "Egito", "El Salvador", "Emirados Árabes Unidos", "Equador", "Eritreia", "Eslováquia", "Eslovênia", "Espanha", "Estados Unidos", "Estônia", "Etiópia", "Filipinas", "Finlândia", "França", "Gabão", "Gâmbia", "Gana", "Geórgia", "Geórgia do Sul e Ilhas Sandwich do Sul", "Gibraltar", "Granada", "Grécia", "Groenlândia", "Guadalupe", "Guam", "Guatemala", "Guernsey", "Guiana", "Guiana Francesa", "Guiné", "Guiné Equatorial", "Guiné-Bissau", "Haiti", "Honduras", "Hong Kong S. A. R", "Hungria", "Iêmen", "Ilha Bouvet", "Ilha Christmas", "Ilha de Man", "Ilha Norfolk", "Ilhas Cayman", "Ilhas Cocos (Keeling)", "Ilhas Cook", "Ilhas Faroés", "Ilhas Fiji", "Ilhas Heard e Ilhas McDonald", "Ilhas Malvinas (Falkland Islands)", "Ilhas Marianas do Norte", "Ilhas Marshall", "Ilhas Salomão", "Ilhas Turks e Caicos", "Ilhas Virgens Americanas", "Ilhas Virgens Britânicas", "Índia", "Indonésia", "Irã", "Iraque", "Irlanda", "Islândia", "Israel", "Itália", "Jamaica", "Japão", "Jersey", "Jordânia", "Kiribati", "Kuaite", "Laos", "Lesoto", "Letônia", "Líbano", "Libéria", "Líbia", "Liechtenstein", "Lituânia", "Luxemburgo", "Macedônia, Antiga República Iugoslava da", "Madagascar", "Malásia", "Malaui", "Maldivas", "Mali", "Malta", "Marrocos", "Martinica", "Maurício", "Mauritânia", "Mayotte", "México", "Micronésia", "Moçambique", "Moldova", "Mônaco", "Mongólia", "Montenegro", "Montserrat", "Myanma", "Namíbia", "Nauru", "Nepal", "Nicarágua", "Níger", "Nigéria", "Niue", "Noruega", "Nova Caledônia", "Nova Zelândia", "Omã", "Países Baixos", "Palau", "Panamá", "Papua-Nova Guiné", "Paquistão", "Paraguai", "Peru", "Pitcairn", "Polinésia Francesa", "Polônia", "Porto Rico", "Portugal", "Quênia", "Quirguistão", "RAE de Macau", "Reino Unido", "República Centro-Africana", "República Dominicana", "República Tcheca", "Reunião", "Romênia", "Ruanda", "Rússia", "Saint-Pierre e Miquelon", "Samoa", "Samoa Americana", "San Marino", "Santa Helena", "Santa Lúcia", "São Tomé e Príncipe", "São Vicente e Granadinas", "Seicheles", "Senegal", "Serra Leoa", "Sérvia", "Síria", "Somália", "Sri Lanka", "St. Kitts e Névis", "Suazilândia", "Sudão", "Suécia", "Suíça", "Suriname", "Svalbard", "Tagiquistão", "Tailândia", "Taiwan", "Tanzânia", "Terras Austrais e Antárticas Francesas", "Território Britânico do Oceano Índico", "Territórios Insulares dos EUA", "Timor Leste", "Togo", "Tokelau", "Tonga", "Trinidad e Tobago", "Tunísia", "Turcomenistão", "Turquia", "Tuvalu", "Ucrânia", "Uganda", "Uruguai", "Uzbequistão", "Vanuatu", "Venezuela", "Vietnã", "Wallis e Futuna", "Zâmbia", "Zimbábue"]
    const select_paises = document.getElementById("pais");
    for (let i = 0; i < paises.length; i++) {
        let option = new Option(paises[i], i)
        select_paises.add(option);
    }
    select_paises.value = "31"; // código do Brasil
}

function get_max_z_index() {
    return Math.max(
        ...Array.from(document.querySelectorAll('body *'), el =>
            parseFloat(window.getComputedStyle(el).zIndex),
        ).filter(zIndex => !Number.isNaN(zIndex)),
        0,
    );
}

function mostrar_div_principal(div) {
    const divs_principais = ["grid-produtos", "detalhes-produto", "carrinho", "carrinho-vazio"];
    divs_principais.forEach(d => {
        const div_ = document.getElementById(d);
        div_.classList.remove("d-block");
        div_.classList.add("d-none");
    });
    const div_ = document.getElementById(div);
    div_.classList.add("d-block");
    div_.classList.remove("d-none");
}

function limpar_formularios() {
    const inputs = [
        document.getElementById("nome-cadastro"),
        document.getElementById("sobrenome-cadastro"),
        document.getElementById("cpf-cadastro"),
        document.getElementById("email-cadastro"),
        document.getElementById("senha-cadastro"),
        document.getElementById("confirmar-senha-cadastro"),
        document.getElementById("datetimepicker1"),
        document.getElementById("email-login"),
        document.getElementById("senha-login"),
        document.getElementById("email-esqueci-senha"),
    ]

    const spans = [
        document.getElementById("email-esqueci-invalido"),
        document.getElementById("email-login-invalido"),
        document.getElementById("login-invalido"),
        document.getElementById("nome-cadastro-invalido"),
        document.getElementById("sobrenome-cadastro-invalido"),
        document.getElementById("cpf-cadastro-invalido"),
        document.getElementById("email-cadastro-invalido"),
        document.getElementById("senha-cadastro-invalido"),
        document.getElementById("confirmar-senha-cadastro-invalido"),
        document.getElementById("nascimento-cadastro-invalido"), 
    ]

    for (let i = 0; i < inputs.length; i++) {
        spans[i].classList.remove("d-block");
        inputs[i].classList.remove("input-erro");
        inputs[i].value = "";
    }
}

const users = [
    {
        email: "felipe@email.com", 
        senha: "000",
        nome: "Felipe",
    },
    {
        email: "joao@email.com", 
        senha: "000",
        nome: "João",
    },
    {
        email: "lucas@email.com", 
        senha: "000",
        nome: "Lucas",
    },
    {
        email: "norton@email.com", 
        senha: "000",
        nome: "Norton",
    },
]

const base_url = "http://127.0.0.1:5005";
