const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display Tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>

            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Mark Complete
        li.querySelector("input").addEventListener("change", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        // Edit Task
        li.querySelector(".edit-btn").addEventListener("click", () => {

            const newTask = prompt("Edit your task:", task.text);

            if (newTask && newTask.trim() !== "") {
                tasks[index].text = newTask.trim();
                saveTasks();
            }

        });

        // Delete Task
        li.querySelector(".delete-btn").addEventListener("click", () => {

            tasks.splice(index, 1);
            saveTasks();

        });

        taskList.appendChild(li);

    });

    updateCounter();
}

// Add Task
addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

});

// Add with Enter Key
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addBtn.click();
    }

});

// Update Counter & Empty State
function updateCounter() {

    const remaining = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `${remaining} Task${remaining !== 1 ? "s" : ""} Remaining`;

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

}

// Save Tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

}

// Initial Load
renderTasks();