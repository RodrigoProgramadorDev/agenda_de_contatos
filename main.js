const form = document.getElementById('form-contato');
const inputNomeContato = document.getElementById('nome-contato');
const inputNumeroContato = document.getElementById('numero-contato');
inputNumeroContato.toString();
const nome = [];
const numero = [];

function removerAviso() {
    const contaneirMsgAvisoNome = document.querySelector('.aviso-msg')
    contaneirMsgAvisoNome.style.display = 'none';
    const contaneirMsgAvisoNumero = document.querySelector('.aviso-msg')
    contaneirMsgAvisoNumero.style.display ='none';
}

let linhas = "";

const celular = (event) => {
    let input = event.target

    input.value = mascaraCelular(input.value)
}

const mascaraCelular = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value  = value.replace(/(\d)(\d{4})$/, "$1-$2")

    return value
}

function adicionaLinha() {

    if (nome.includes(inputNomeContato.value)) {
        const msgAvisoNome = `O Nome: ${inputNomeContato.value} já foi adiciondo a lista`;
        const contaneirMsgAvisoNome = document.querySelector('.aviso-msg')
        contaneirMsgAvisoNome.style.display ='flex';
        contaneirMsgAvisoNome.innerHTML = msgAvisoNome;
    } else if(numero.includes(inputNumeroContato.value)) {
        const msgAvisoNumero = `O Número: ${inputNumeroContato.value} já foi adiciondo a lista`;
        const contaneirMsgAvisoNumero = document.querySelector('.aviso-msg')
        contaneirMsgAvisoNumero.style.display ='flex';
        contaneirMsgAvisoNumero.innerHTML = msgAvisoNumero;
    } else {
        nome.push(inputNomeContato.value);
        numero.push(inputNumeroContato.value);

        let linha = '<tr>'
        linha += `<td>${inputNomeContato.value}</td>`
        linha += `<td>${inputNumeroContato.value}</td>`

        linhas += linha;

        const dadosJSON = JSON.stringify(linhas);

        localStorage.setItem(linhas, dadosJSON);
    }

    inputNomeContato.value = '';
    inputNumeroContato.value = '';

}


function atulizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atulizaTabela();
})