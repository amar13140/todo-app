const taskInput =
document.getElementById("task-input");

const addBtn =
document.getElementById("add-btn");

const taskList =
document.getElementById("task-list");

const filterButtons =
document.querySelectorAll(".filters button");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks =
        tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {

        filteredTasks =
        tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li =
        document.createElement("li");

        li.className =
        task.completed ? "task completed" : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div>

                <button class="complete-btn">
                    ✓
                </button>

                <button class="delete-btn">
                    ✕
                </button>

            </div>
        `;

        li.dataset.id = task.id;

        taskList.appendChild(li);
    });
}

function addTask() {

    const text =
    taskInput.value.trim();

    if (text === "") return;

    tasks.push({

        id: Date.now(),

        text,

        completed: false
    });

    taskInput.value = "";

    saveTasks();

    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskList.addEventListener("click", (e) => {

    const id =
    Number(e.target.closest(".task").dataset.id);

    if (e.target.classList.contains("delete-btn")) {

        tasks =
        tasks.filter(task => task.id !== id);
    }

    if (e.target.classList.contains("complete-btn")) {

        tasks =
        tasks.map(task => {

            if (task.id === id) {

                task.completed =
                !task.completed;
            }

            return task;
        });
    }

    saveTasks();

    renderTasks();
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter =
        button.dataset.filter;

        renderTasks();
    });
});

renderTasks();
