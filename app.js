const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefa = document.getElementById('lista-tarefa');
const elementoDataHora = document.getElementById('data-hora');
const btnTema = document.getElementById('btn-tema');

let tarefas = carregarTarefas();


function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

console.log(inputTarefa);
console.log(btnAdicionar);
console.log(listaTarefa);

function adicionarTarefa() {
    const textoTarefa = inputTarefa.value;
    
    if (!textoTarefa) return; 
    
    
    const novaTarefa = {
        texto: textoTarefa,
        concluida: false
    };
    tarefas.push(novaTarefa);
    
    
    salvarTarefas(tarefas);
    
    
    criarElementoTarefa(novaTarefa, tarefas.length - 1);
    
    
    inputTarefa.value = '';
}

function criarElementoTarefa(tarefa, indice) {
    const lista = document.createElement('li');
    lista.textContent = tarefa.texto;
    
    // Se a tarefa está concluída, adiciona a classe
    if (tarefa.concluida) {
        lista.classList.add('concluida');
    }
    
    
    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = '❌';
    btnDeletar.addEventListener('click', function() {
        
        tarefas.splice(indice, 1);
        
        salvarTarefas(tarefas);
        
        lista.remove();
    });
    
    
    lista.addEventListener('click', function(e) {
        
        if (e.target === btnDeletar) return;
        
        lista.classList.toggle('concluida');
        
        tarefa.concluida = !tarefa.concluida;
        
        salvarTarefas(tarefas);
    });
    
    lista.appendChild(btnDeletar);
    listaTarefa.appendChild(lista);
}

function renderizarTarefas() {
    
    listaTarefa.innerHTML = '';
    
    
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
    
    document.body.classList.toggle('tema-claro');
    
    
    if (document.body.classList.contains('tema-claro')) {
        btnTema.textContent ='☀️'; 
    } else {
        btnTema.textContent ='🌙'; 
    }
}

btnTema.addEventListener('click', trocarTema);
btnAdicionar.addEventListener('click', adicionarTarefa);

renderizarTarefas();


atualizarDataHora();


setInterval(atualizarDataHora, 1000);