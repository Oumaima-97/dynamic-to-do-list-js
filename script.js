document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Remove task when button is clicked
        removeButton.addEventListener("click", () => {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        });

        // Append button to list item, then add list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save task to Local Storage if save flag is true
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear input field
        taskInput.value = "";
    }

    // Function to save tasks to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Event listener for Add Task button
    addButton.addEventListener("click", () => addTask(taskInput.value));

    // Event listener for Enter key press
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
