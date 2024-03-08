const apiUrl = '/todos';

async function fetchTodos() {
    const response = await axios.get(apiUrl);
    const todos = response.data;
    const incompleteList = document.getElementById('incompleteTodos');
    const completedList = document.getElementById('completedTodos');
    incompleteList.innerHTML = ''; // Clear current todos
    completedList.innerHTML = ''; // Clear current todos
    todos.forEach(todo => {
        let li = document.createElement('li');
        li.textContent = todo.title + ' ';

        let toggleBtn = document.createElement('button');
        toggleBtn.textContent = todo.completed ? '未完了に戻す' : 'Complete';
        toggleBtn.onclick = () => toggleCompletion(todo.id, todo.completed);
        li.appendChild(toggleBtn);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.id);
        li.appendChild(deleteBtn);

        if (todo.completed) {
            completedList.appendChild(li);
        } else {
            incompleteList.appendChild(li);
        }
    });
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    const title = input.value;
    if (title) {
        await axios.post(apiUrl, { title: title, completed: false });
        input.value = '';
        fetchTodos();
    }
}

async function deleteTodo(id) {
    await axios.delete(`${apiUrl}/${id}`);
    fetchTodos();
}

async function toggleCompletion(id, completed) {
    const path = completed ? '/incomplete' : '/complete';
    await axios.patch(`${apiUrl}/${id}${path}`);
    fetchTodos();
}

document.addEventListener('DOMContentLoaded', fetchTodos);
