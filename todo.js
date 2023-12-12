document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");

        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);

            tasks.forEach(function (taskText) {
                addTaskToList(taskText);
            });
        }
    }

    // Save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll("li");

        taskElements.forEach(function (taskElement) {
            const taskText = taskElement.querySelector("span").innerText;
            tasks.push(taskText);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task to the list
    function addTaskToList(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <i class="fas fa-check complete"></i>
            <i class="fas fa-trash delete"></i>
        `;
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addNewTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToList(taskText);
            taskInput.value = "";

            // Save the updated task list to local storage
            saveTasksToLocalStorage();
        }
    }

    // Function to mark a task as completed
    function completeTask(event) {
        event.target.closest("li").classList.toggle("completed");

        // Save the updated task list to local storage
        saveTasksToLocalStorage();
    }

    // Function to delete a task
    function deleteTask(event) {
        event.target.closest("li").remove();

        // Save the updated task list to local storage
        saveTasksToLocalStorage();
    }

    // Event listeners
    addTaskButton.addEventListener("click", addNewTask);
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addNewTask();
        }
    });
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("complete")) {
            completeTask(event);
        } else if (event.target.classList.contains("delete")) {
            deleteTask(event);
        }
    });

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();
});