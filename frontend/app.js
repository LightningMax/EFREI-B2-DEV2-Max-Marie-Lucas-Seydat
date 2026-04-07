const API_URL = 'http://localhost:3000/api/todos'; 
async function loadTodos() {
    try {
        const res = await fetch(API_URL);
        const todos = await res.json();
        const list = document.getElementById('todo-list');
        list.innerHTML = ''; // On vide la liste avant de la recharger

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            // On barre le texte si isDone est true
            const titleClass = todo.isDone ? 'done' : '';

            li.innerHTML = 
                <span class="${titleClass}">${todo.titre}</span>
                <div>
                    <button onclick="toggleTodo('${todo._id}', ${todo.isDone})">✔️</button>
                    <button onclick="deleteTodo('${todo._id}')">❌</button>
                </div>
            ;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des todos', error);
    }
}

async function addTodo() {
    const input = document.getElementById('todo-input');
    const titre = input.value.trim();

    if (!titre) return alert('Le titre est requis');

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre, isDone: false })
    });

    input.value = '';
    loadTodos(); 
}

async function toggleTodo(id, currentStatus) {
    await fetch(${API_URL}/${id}, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: !currentStatus })
    });

    loadTodos();
}

async function deleteTodo(id) {
    await fetch(${API_URL}/${id}, {
        method: 'DELETE'
    });

    loadTodos();
}
loadTodos();