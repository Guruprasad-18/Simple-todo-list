const taskListElement = document.getElementById("taskList");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");

  const getTasksFromStorage = () => {
    return JSON.parse(localStorage.getItem("todoTasks")) || [];
  };

  const saveTasksToStorage = (tasks) => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  };

  let taskList = getTasksFromStorage();

  const addTaskToDOM = (taskText) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.innerHTML = `<li>${taskText}</li> <button class="delete-btn">Delete</button>`;
    taskListElement.appendChild(taskDiv);
  };

  const showAllTasks = () => {
    taskList.forEach((task) => {
      addTaskToDOM(task);
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    taskInput.value = "";

    const isDuplicate = taskList.includes(taskText);

    if (taskText !== "" && !isDuplicate) {
      taskList.push(taskText);
      taskList = [...new Set(taskList)];
      saveTasksToStorage(taskList);
      addTaskToDOM(taskText);
    }
  };

  const deleteTask = (e) => {
    const targetBtn = e.target;
    if (targetBtn.classList.contains("delete-btn")) {
      const taskText = targetBtn.previousElementSibling.innerText;
      const parentDiv = targetBtn.parentElement;

      taskList = taskList.filter((task) => task.toLowerCase() !== taskText.toLowerCase());
      saveTasksToStorage(taskList);
      parentDiv.remove();
    }
  };

  taskListElement.addEventListener("click", deleteTask);
  addTaskBtn.addEventListener("click", handleAddTask);

  showAllTasks();