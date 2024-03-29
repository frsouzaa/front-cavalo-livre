function carregar_conteudo() {
    handle_valida_usuario();
    const parametros = new URLSearchParams(window.location.search)
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho instanceof Array || !carrinho) {
        carrinho = {};
        localStorage.removeItem("carrinho")
    }
    if (parametros.get("produto")) {
        get_view_detalhes(parametros);
        mostrar_div_principal("detalhes-produto");
    } else if(parametros.get("carrinho")) {
        if (JSON.stringify(carrinho) === JSON.stringify({})) {
            mostrar_div_principal("carrinho-vazio")
        } else {
            get_view_carrinho();
            mostrar_div_principal("carrinho")
        }
    } else {
        const pesquisa = document.getElementById("pesquisa");
        pesquisa.classList.remove("d-none");
        get_view_grid_produtos();
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

function get_produtos(lista_produtos) {
    // todo

    let res = [];
    if (!lista_produtos) {
        res = prod;
    } else {
        lista_produtos.forEach(produto => {
            res.push(prod.filter(p => p.id === produto)[0]);
        })
    }
    let categorias = [];
    res.forEach(p => {
        p.categorias.forEach(c => {
            if (categorias.indexOf(c) === -1) {
                categorias.push(c);
            }
        });
    });
    localStorage.setItem("categorias", JSON.stringify(categorias));
    return res
}

function get_detalhes_produto(id) {
    // todo

    return detalhe[id];
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
        let option = new Option(paises[i], paises[i])
        select_paises.add(option);
    }
    select_paises.value = "Brasil"
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

const prod = [
    {
        id: "cavalo-lindo-bonito-cavalo",
        nome: "Cavalo lindo bonito cavalo",
        preco: 5089.0,
        categorias: ["Animal", "Transporte"],
        imagem: "https://static.mundoeducacao.uol.com.br/mundoeducacao/2019/08/cavalo.jpg"
    },
    {
        id: "bota-estilosa",
        nome: "Bota estilosa",
        preco: 220.99,
        categorias: ["Vastuário"],
        imagem: "data:image/jpeg;base64,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"
    },
    {
        id: "adubo",
        nome: "Adubo",
        preco: 89.90,
        categorias: ["Platação"],
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc1iMiWyadD_sHnmo8RFJBN-T9GIWeRclhg&usqp=CAU"
    },
    {
        id: "trator-verde-legal",
        nome: "Trator verde legal",
        preco: 89574.56,
        categorias: ["Ferramenta", "Transporte"],
        imagem: "https://www.deere.com.br/assets/images/region-3/products/tractors/5e-series/5078e/r3g001968_NK_trator_5e_5078e_pulverizando_com_pulverizador_large_ca371121b03b904b3aac702bb4b5dee0666d691c.jpg"
    },
    {
        id: "jaqueta",
        nome: "Jaqueta de couro maneira",
        preco: 274.99,
        categorias: ["Vastuário", "Ferramenta"],
        imagem: "https://img.freepik.com/fotos-gratis/jaqueta-de-couro-tan-classico_1101-731.jpg?q=10&h=200"
    },
    {
        id: "burro",
        nome: "Burrinho",
        preco: 3487.08,
        categorias: ["Animal"],
        imagem: "https://wp.pt.aleteia.org/wp-content/uploads/sites/5/2017/07/untitled-design10.jpg?w=620&h=348&crop=1"
    },
    {
        id: "sementes",
        nome: "2Kg de sementes diversas",
        preco: 20.45,
        categorias: ["Platação"],
        imagem: "https://www.infoescola.com/wp-content/uploads/2010/10/sementes-110365694.jpg"
    }
]

const detalhe = {
    "cavalo-lindo-bonito-cavalo": {
        id: "cavalo-lindo-bonito-cavalo",
        nome: "Cavalo lindo bonito cavalo",
        preco: 5089.0,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "https://static.mundoeducacao.uol.com.br/mundoeducacao/2019/08/cavalo.jpg",
            "https://www.escoladocavalo.com.br/wp-content/uploads/2022/07/como-socorrer-um-cavalo-facebook.jpg",
            "data:image/jpeg;base64,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",
            "data:image/jpeg;base64,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"
        ]
    },
    "bota-estilosa": {
        id: "bota-estilosa",
        nome: "Bota estilosa",
        preco: 220.99,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "data:image/jpeg;base64,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",
            "https://i.pinimg.com/originals/8a/9c/de/8a9cde547a6375aa80a588b672e276ab.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlLoFmKUI3QhdSdrE5Au8qHDTMmq7o-WnW68TgHFfp522zhuq2OmnNT0VgcFkRfd6W4V4&usqp=CAU",
        ]
    },
    "adubo": {
        id: "adubo",
        nome: "Adubo",
        preco: 89.90,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc1iMiWyadD_sHnmo8RFJBN-T9GIWeRclhg&usqp=CAU",
            "https://www.sitiodamata.com.br/pub/media/catalog/product/cache/80281f1a4d89199560fc0837e49d13da/a/d/adubo-equilibrio-500ml_2nd.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVrqkbXAkUYM2YKBoqdb6w5YZEisgsHIJKyQ&usqp=CAU",
            "https://blog.jacto.com.br/wp-content/uploads/2021/03/post_thumbnail-e526849c137c052211d9d0b52b65cd03-925x308.jpeg"
        ]
    },
    "trator-verde-legal": {
        id: "trator-verde-legal",
        nome: "Trator verde legal",
        preco: 89574.56,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "https://www.deere.com.br/assets/images/region-3/products/tractors/5e-series/5078e/r3g001968_NK_trator_5e_5078e_pulverizando_com_pulverizador_large_ca371121b03b904b3aac702bb4b5dee0666d691c.jpg",
            "data:image/jpeg;base64,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",
        ]
    },
    "jaqueta": {
        id: "jaqueta",
        nome: "Jaqueta de couro maneira",
        preco: 274.99,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "https://img.freepik.com/fotos-gratis/jaqueta-de-couro-tan-classico_1101-731.jpg?q=10&h=200",
        ]
    },
    "burro": {
        id: "burro",
        nome: "Burrinho",
        preco: 3487.08,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "https://wp.pt.aleteia.org/wp-content/uploads/sites/5/2017/07/untitled-design10.jpg?w=620&h=348&crop=1",
            "https://st2.depositphotos.com/10055026/49531/i/450/depositphotos_495316206-stock-photo-donkey-eating-grass-animal-concept.jpg"
        ]
    },
    "sementes": {
        id: "sementes",
        nome: "2Kg de sementes diversas",
        preco: 20.45,
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iure cum debitis dolorum, distinctio inventore nostrum optio? Temporibus cumque accusantium eos sequi harum fugit ipsa, rem magni repudiandae dolore a.",
        categorias: [],
        imagens: [
            "https://www.infoescola.com/wp-content/uploads/2010/10/sementes-110365694.jpg",
            "https://blog.agromove.com.br/wp-content/uploads/2019/03/20190318-imagem-para-tratamento-de-sementes-Blog-image.jpeg",
            "https://blog.syngentadigital.ag/wp-content/uploads/2021/04/16-04_producao_de_sementes_01.jpg"
        ]
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