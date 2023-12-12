document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    
    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");

        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);

            tasks.forEach(function (taskText) {
                addTaskToList(taskText);
            });
        }
    }

    
    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll("li");

        taskElements.forEach(function (taskElement) {
            const taskText = taskElement.querySelector("span").innerText;
            tasks.push(taskText);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    
    function addTaskToList(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <i class="fas fa-check complete"></i>
            <i class="fas fa-trash delete"></i>
        `;
        taskList.appendChild(li);
    }


    function addNewTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToList(taskText);
            taskInput.value = "";

            
            saveTasksToLocalStorage();
        }
    }

    
    function completeTask(event) {
        event.target.closest("li").classList.toggle("completed");

        
        saveTasksToLocalStorage();
    }

    
    function deleteTask(event) {
        event.target.closest("li").remove();

        
        saveTasksToLocalStorage();
    }

    
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

    
    loadTasksFromLocalStorage();
});
