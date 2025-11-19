const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefa = document.getElementById('lista-tarefa');
const elementoDataHora = document.getElementById('data-hora');
const btnTema = document.getElementById('btn-tema');

let tarefas = carregarTarefas();

// Função para SALVAR tarefas no localStorage
function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para CARREGAR tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

console.log(inputTarefa);
console.log(btnAdicionar);
console.log(listaTarefa);

function adicionarTarefa() {
    const textoTarefa = inputTarefa.value;
    
    if (!textoTarefa) return; // não adiciona se estiver vazio
    
    // 1. Adicionar no array
    const novaTarefa = {
        texto: textoTarefa,
        concluida: false
    };
    tarefas.push(novaTarefa);
    
    // 2. Salvar no localStorage
    salvarTarefas(tarefas);
    
    // 3. Criar o <li> e mostrar na tela
    criarElementoTarefa(novaTarefa, tarefas.length - 1);
    
    // 4. Limpar input
    inputTarefa.value = '';
}

function criarElementoTarefa(tarefa, indice) {
    const lista = document.createElement('li');
    lista.textContent = tarefa.texto;
    
    // Se a tarefa está concluída, adiciona a classe
    if (tarefa.concluida) {
        lista.classList.add('concluida');
    }
    
    // Botão deletar
    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = '❌';
    btnDeletar.addEventListener('click', function() {
        // Remover do array
        tarefas.splice(indice, 1);
        // Salvar
        salvarTarefas(tarefas);
        // Remover da tela
        lista.remove();
    });
    
    // Clique para marcar/desmarcar como concluída
    lista.addEventListener('click', function(e) {
        // Evita conflito com o botão deletar
        if (e.target === btnDeletar) return;
        
        lista.classList.toggle('concluida');
        // Atualizar no array
        tarefa.concluida = !tarefa.concluida;
        // Salvar
        salvarTarefas(tarefas);
    });
    
    lista.appendChild(btnDeletar);
    listaTarefa.appendChild(lista);
}

function renderizarTarefas() {
    // Limpa a lista antes de renderizar
    listaTarefa.innerHTML = '';
    
    // Cria cada tarefa salva
    tarefas.forEach((tarefa, indice) => {
        criarElementoTarefa(tarefa, indice);
    });
}

function atualizarDataHora() {
    const agora = new Date();
    
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const dia = agora.getDate();
    const mes = agora.getMonth() + 1;
    const ano = agora.getFullYear();
    const segundos = agora.getSeconds();
    
    const textoDataHora = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
    
    elementoDataHora.textContent = textoDataHora;
}

function trocarTema() {
    // Alternar a classe 'tema-claro' no body
    document.body.classList.toggle('tema-claro');
    
    // Trocar o emoji do botão
    if (document.body.classList.contains('tema-claro')) {
        btnTema.textContent ='☀️'; // tema claro = sol
    } else {
        btnTema.textContent ='🌙'; // tema escuro = lua
    }
}

btnTema.addEventListener('click', trocarTema);
btnAdicionar.addEventListener('click', adicionarTarefa);

renderizarTarefas();

// Chamar imediatamente
atualizarDataHora();

// Chamar a cada 1 segundo (1000ms)
setInterval(atualizarDataHora, 1000);