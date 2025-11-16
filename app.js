const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefa = document.getElementById('lista-tarefa');
const elementoDataHora = document.getElementById('data-hora');
const btnTema = document.getElementById('btn-tema');

console.log(inputTarefa);
console.log(btnAdicionar);
console.log(listaTarefa);

function adicionarTarefa() {
    const tarefa = inputTarefa.value;
    const lista = document.createElement('li');
    const btnDeletar = document.createElement('button'); 
    
    lista.textContent = tarefa;
    btnDeletar.textContent = '❌';
    
    // Evento do botão
    btnDeletar.addEventListener('click', function(){
        lista.remove();
    });

    lista.addEventListener('click', function() {
        lista.classList.toggle('concluida');
    });
    
    // Adicionar botão dentro do <li>
    lista.appendChild(btnDeletar);
    
    // Adicionar <li> na lista (SÓ UMA VEZ!)
    listaTarefa.appendChild(lista);
    
    // Limpar input (SÓ UMA VEZ!)
    inputTarefa.value = '';
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

// Chamar imediatamente
atualizarDataHora();

// Chamar a cada 1 segundo (1000ms)
setInterval(atualizarDataHora, 1000);