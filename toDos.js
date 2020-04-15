//referenciar os elementos importantes do html (que armazenam algum dado)
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

//armazenar os valores colocados no toDo.
//Os dados no local storage estao salvos em JSON, precisamos colocar JSON.parse para retornar ao formado de array
//como no inicio o array n tem nenhum valor (pq o usuario n digitou nada ainda) precisamos colocar outra opcao para a variavel todo receber, fazemos isso usando o OU e o array vazio
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

//funçao para renderizar os toDos na tela
function renderTodos (){
    // para excluir o conteúdo da lista antes de colocar um novo toDo, se não fizermos isso quando o usuário adiciona algo novo no toDo ele repete os itens que já estavam lá
    listElement.innerHTML = '';

    //for especifico para arrays
    for (todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        //para criar a funçao com o link para excluir o toDo
        var linkElement = document.createElement('a');

        // a tag 'a' precisa obrigatoriamente ter um href
        linkElement.setAttribute('href', '#');

        // a funcao indexOf no JS recebe um valor e retorna a posiçao desse valor no array. Iremos usar isso na funcao de deletar
        var pos = todos.indexOf(todo);
        // adicionar o atributo de click no link que irá executar a funcao de deletar o toDo
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        var linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText); 

        //para colocar o todoText  e o link dentro do todoElement
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        //para colocar cada item do todoElement dentro do listElement
        listElement.appendChild(todoElement);
    }
}

renderTodos();

//para "ouvir" o botão adicionar e conseguir armazenar os valores colocados pelo usuário
function addTodo(){
    var todoText = inputElement.value;

    //adicionar esse todoText no array
    todos.push(todoText);
    //para apagar o texto escrito da caixa de input
    inputElement.value = '';
    //para aparecer a nova frase na lista
    renderTodos();
    saveToStorage();
}

// Chamar a funcao addTodo apenas quando o usuário clicar no botao de adicionar
buttonElement.onclick = addTodo;

// funcao para excluir o toDo quando o usuário clica no link baseado na posiçao desse toDo dentro do array
function deleteTodo(pos){
    // o método splice remove uma qtdade de itens do array baseado na posiçao que recebe. Aqui ele irá remover UM item
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

// funcao para armazenar as atualizacoes feitas na lista (excluir ou adicionar toDos) no local storage
function saveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos));
    // nao é possivel salvar arrays no local storage (entao nao daria pra colocar apenas o todos como segundo parametro da funcao localStorage).
    // Só dá para salvar strings. Portanto, vamos precisar converter o array em uma estrutura que o localStorage consegue salvar
    // A estrutura que iremos usar é a JSON. O stringify transforma nosso array em uma string
}