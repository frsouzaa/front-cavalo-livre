function valida_form_login() {
    const email = document.getElementById("email-login");
    const senha = document.getElementById("senha-login");
    
    const email_invalido = document.getElementById("email-login-invalido");
    const login_invalido = document.getElementById("login-invalido");
    
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+((\.[a-z]+)+)?$/i;

    if (!regexEmail.test(email.value)) {
        email_invalido.classList.add("d-block")
        email.classList.add("input-erro")
        return
    } else {
        email_invalido.classList.remove("d-block")
        email.classList.remove("input-erro")
    }

    const res = valida_login_api(email.value, senha.value);

    if (!res) {
        login_invalido.classList.add("d-block")
        return
    } else {
        login_invalido.classList.remove("d-block")
    }
}

function valida_login_api(email, senha) {
    // todo
    return false;
}

function valida_form_cadastro() {
    const nome = document.getElementById("nome-cadastro");
    const sobrenome = document.getElementById("sobrenome-cadastro");
    const cpf = document.getElementById("cpf-cadastro");
    const email = document.getElementById("email-cadastro");
    const senha = document.getElementById("senha-cadastro");
    const confirmar_senha = document.getElementById("confirmar-senha-cadastro");
    const nascimento = document.getElementById("datetimepicker1");
    
    const nome_invalido = document.getElementById("nome-cadastro-invalido");
    const sobrenome_invalido = document.getElementById("sobrenome-cadastro-invalido");
    const cpf_invalido = document.getElementById("cpf-cadastro-invalido");
    const email_invalido = document.getElementById("email-cadastro-invalido");
    const senha_invalido = document.getElementById("senha-cadastro-invalido");
    const confirmar_invalido = document.getElementById("confirmar-senha-cadastro-invalido");
    const nascimento_invalido = document.getElementById("nascimento-cadastro-invalido");
    
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+((\.[a-z]+)+)?$/i;

    valida_campo(nome, nome_invalido, !nome.value);
    valida_campo(sobrenome, sobrenome_invalido, !sobrenome.value);
    valida_campo(cpf, cpf_invalido, !TestaCPF(cpf.value));
    valida_campo(email, email_invalido, !regexEmail.test(email.value));
    valida_campo(senha, senha_invalido, !senha.value);
    valida_campo(confirmar_senha, confirmar_invalido, confirmar_senha.value !== senha.value);
    valida_campo(nascimento, nascimento_invalido, !nascimento.value);



    const res = cadastra(nome.value, sobrenome.value, cpf.value, email.value, senha.value);

}

function cadastra(nome, sobrenomw, cpf, email, senha) {
    // todo
    return false;
}

function valida_form_esqueci() {
    const email = document.getElementById("email-esqueci-senha");
    
    const email_invalido = document.getElementById("email-esqueci-invalido");
    
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+((\.[a-z]+)+)?$/i;

    valida_campo(email, email_invalido, !regexEmail.test(email.value))
}

function valida_campo(input, span, expressao) {
    if (expressao) {
        span.classList.add("d-block")
        input.classList.add("input-erro")
    } else {
        span.classList.remove("d-block")
        input.classList.remove("input-erro")
    }
}

function TestaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    if (!strCPF) return false;
    if (strCPF === "00000000000" || 
        strCPF === "11111111111" ||
        strCPF === "22222222222" ||
        strCPF === "33333333333" ||
        strCPF === "44444444444" ||
        strCPF === "55555555555" ||
        strCPF === "66666666666" ||
        strCPF === "77777777777" ||
        strCPF === "88888888888" ||
        strCPF === "99999999999") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
}

function permite_apenas_numeros(e) {
    const regex_numeros = /[0123456789]{1}/i;
    if (regex_numeros.test(e.key)) return true;
    return false;
}