const inputTarefa = document.querySelector('.inputTarefa');
const tarefas = document.querySelector('.tarefas');

//cria somente uma li
function criaLi() {
    const li = document.createElement('li');
    return li;
};

//chama o evento de pressionar tecla, verificar se é o enter '13',
//se for, ele faz as mesmas funções do adicionar 
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        inputTarefa.value = '';
        inputTarefa.focus();
    }
});

//cria o elemento de botão, setAttribute coloca uma classe
function apagar(li) {
    li.innerText += ' ';
    const botao = document.createElement('button');
    botao.innerText = 'Apagar Tarefa';
    botao.setAttribute('class', 'apagar');
    li.appendChild(botao);
};

//Cria uma li e pega o texto do input para jogar lá , puxa a função de apagar e salvar
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    apagar(li);
    salvar();
};


//Pega o evento de click no botão > confere se existe um valor no input > puxa a função de criar tarefa
//Limpa o input e volta a focar nele 
const adicionar = document.querySelector('.adicionar').addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    inputTarefa.value = '';
    inputTarefa.focus();
});

//junto a função de apagar, chama o evento de clique e remove o pai dele com 
//parentElement.remove

//chama a função de salvar para que monitore quando um evento vai ser excluído
document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvar();
    }
});

//Seleciona todas as li's de tarefas, cria um array, pega somnete o texto da tarefa,
//tira o apagar tarefa e o trim é para remover os espaços em branco
//push para colocar o litarefas dentro do array
function salvar() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let liTarefa of liTarefas) {
        let liTexto = liTarefa.innerText;
        liTexto = liTexto.replace('Apagar Tarefa', '').trim();
        listaDeTarefas.push(liTexto);
    }; 

    //transforma a tarefas em um JSON e depois seta em local storage
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}

//pega o item no localn storage com o get, transforma de novo em string 
//com parse e com for ele pega as informações de tarefas e puxa a função
//de criar tarefas
function addTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

//é preciso chamar a função do JSON fora das funções 
addTarefas();
