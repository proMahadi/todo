let addTask = document.querySelector("#addTask");
let taskInput = document.querySelector("#taskInput");
let taskList = document.querySelector("#task-list");
let task = document.querySelector(".task");
let totalProgress = document.querySelector("#progress")
let nummbers = document.querySelector("#numbers")
let tasks = [];


const saveTasks = () =>{
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks =JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTaskList()
        updateStats()
    }
})

const newTask = () => {
  let text = taskInput.value;
  if (text) {
    tasks.push({
      text: text,
      completed: false,
    });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  console.log(tasks);
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};
const editTask = (index) => {
    taskInput.value = tasks[index].text
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();

};

const updateStats = () =>{
    const completedTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completedTasks/totalTasks) * 100
    totalProgress.style.width = `${progress}%`
    
    nummbers.innerHTML = `${completedTasks} / ${totalTasks}`
}

const updateTaskList = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <label for="task${index}" class="task ${
      task.completed ? "completed" : ""
    }">
            <input type="checkbox" id="task${index}" ${
      task.completed ? "checked" : ""
    } />
            <span>${task.text}</span>
        </label>
          <div class="buttons">
          <button onClick="editTask(${index})">
            <img src="./images/edit.png" alt="edit" />
          </button>
            <button onClick="deleteTask(${index})">
              <img src="./images/delete.png" alt="delete"/>
            </button>
          </div>
        `;
    listItem.addEventListener("change", () => {
      toggleTaskComplete(index);
    });
    taskList.append(listItem);
    console.log(task);
  });
};

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  newTask();
});
