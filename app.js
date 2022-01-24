// Define UI  vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all  event Listeners
loadEventListeners();

// Load all  event Listeners
function loadEventListeners() {
  // Dom Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task Event
  form.addEventListener("submit", addTask);
  // Remove task Event
  taskList.addEventListener("click", removeTask);
  // Remove all the tasks
  clearBtn.addEventListener("click", ClearTaks);
  // Filter Through tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks From LocalStorage
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    li.className = "collection-item";

    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-remove" style= "cursor: pointer";></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value !== null) {
    alert(" Add a task");
  }

  // Create li Element
  const li = document.createElement("li");
  // Add a class
  li.className = "collection-item";

  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link Element
  const link = document.createElement("a");

  // Add Class
  link.className = "delete-item secondary-content";

  // Add icon
  link.innerHTML = '<i class="fa fa-remove" style= "cursor: pointer";></i>';

  // Append the link to  Li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Storage to Local Storage
  StoreTaskToLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = "";

  e.preventDefault();
}

function StoreTaskToLocalStorage(taskValue) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskValue);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure u Wanna delete this Task ?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear All Tasks
function ClearTaks(e) {
  // 1st Method
  // taskList.innerHTML = "" ;

  // 2nd Method Method

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter with Keyword
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
