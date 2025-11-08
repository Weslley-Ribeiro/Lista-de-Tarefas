const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefa = document.getElementById('lista-tarefa');

console.log(inputTarefa);
console.log(btnAdicionar);
console.log(listaTarefa);

function adicionarTarefa() {
    const tarefa = inputTarefa.value;
    const lista = document.createElement('li');
    lista.textContent = tarefa;

    listaTarefa.appendChild(lista);
    inputTarefa.value = '';
}

btnAdicionar.addEventListener('click', adicionarTarefa);

// PASSO 1: Selecionar...?
const numero = document.getElementById('numero');
const botao = document.getElementById('btnAumentar');

// PASSO 2 a 5: Criar função
function aumentar() {        // PASSO 3: Processar (+1)
    let atualValor = numero.textContent;
    let valor = parseInt (atualValor);// PASSO 4: Mostrar novo valor
    let soma = valor + 1;
    numero.textContent = soma;
}

 botao.addEventListener('click', aumentar);// Conectar botão
