const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefa = document.getElementById('lista-tarefa');

console.log(inputTarefa);
console.log(btnAdicionar);
console.log(listaTarefa);

function adicionarTarefa() {
    const tarefa = inputTarefa.value;
    const lista = document.createElement('li');
    const btnDeletar = document.createElement('button'); // consertei o typo "bnt"
    
    lista.textContent = tarefa;
    btnDeletar.textContent = '❌';
    
    // Evento do botão
    btnDeletar.addEventListener('click', function(){
        lista.remove();
    });
    
    // Adicionar botão dentro do <li>
    lista.appendChild(btnDeletar);
    
    // Adicionar <li> na lista (SÓ UMA VEZ!)
    listaTarefa.appendChild(lista);
    
    // Limpar input (SÓ UMA VEZ!)
    inputTarefa.value = '';
}

btnAdicionar.addEventListener('click', adicionarTarefa);
