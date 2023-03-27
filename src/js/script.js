function carregar_conteudo() {
    gerar_grid_produtos();
    gerar_lista_filtros();


    

      new tempusDominus.TempusDominus(document.getElementById('datetimepicker1'),
      {
        allowInputToggle: false,
        // localization["locale"]: "pt-BR"
      })

      

    


}

function gerar_grid_produtos() {
    const conteudo = document.getElementsByClassName("produtos")[0];
    const linhas = 7; 
    for (let i = 0; i < linhas; i++) {
        conteudo.innerHTML += `
        <div class="row">
            ${gerar_cards(3)}
        </div>
        `;
    }
}

function gerar_cards(quantidade) {
    let cards = ``;
    for (let i = 0; i < quantidade; i++) {
        cards = ` ${cards}
        <div class="div-card-produto col-md-4" onclick="abrir_produto()">
            <div class="produto">
                <div class="div-imagem">

                </div>
                <div class="interacao row">
                    <div class="informacoes col-md">                                    
                        <div class="nome-produto text-wrap fs-5">
                            Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div class="preco-produto text-wrap text-uppercase fs-4">
                            R$ 0,00
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

function focus_icon_by_class(icon) {
    const element = document.getElementsByClassName(icon)[0]
    element.style = "border-color: #198754 !important"
}

function blur_icon_by_class(icon) {
    const element = document.getElementsByClassName(icon)[0]
    element.style = "border-color: #dee2e6 !important"
}