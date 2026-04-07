const API_URL = "http://localhost:3000/todos";
async function loadTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    const list = document.getElementById("todo-list");
    list.innerHTML = ""; // On vide la liste avant de la recharger

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      // On barre le texte si isDone est true
      const titleClass = todo.isDone ? "done" : "";

      li.innerHTML = `
                <div style="flex: 1;">
                    <span class="${titleClass}">${todo.titre}</span>
                    ${todo.description ? `<p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">${todo.description}</p>` : ""}
                </div>
                <div>
                    <button onclick="toggleTodo('${todo._id}', ${todo.isDone})">✔️</button>
                    <button onclick="deleteTodo('${todo._id}')">❌</button>
                </div>
            `;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des todos", error);
  }
}

async function addTodo() {
  const input = document.getElementById("todo-input");
  const titre = input.value.trim();

  if (!titre) return alert("Le titre est requis");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titre, description: "", isDone: false }),
    });

    input.value = "";
    loadTodos();
  } catch (error) {
    console.error("Erreur lors de l'ajout du todo", error);
  }
}

async function toggleTodo(id, currentStatus) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !currentStatus }),
    });

    loadTodos();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du todo", error);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    loadTodos();
  } catch (error) {
    console.error("Erreur lors de la suppression du todo", error);
  }
}
loadTodos();
