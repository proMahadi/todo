let addTask = document.querySelector("#addTask");
let taskInput = document.querySelector("#taskInput");
let taskList = document.querySelector("#task-list");
let tasks = [];

const newTask = () => {
    let text = taskInput.value
    if(text){
        tasks.push({
            text:text,
            completed:false
        });
        taskInput.value = "";
        updateTaskList();
    }
};

const updateTaskList = () =>{
    taskList.innerHTML = "";
    tasks.forEach(task =>{
        const listItem = document.createElement('li')

        // listItem.innerHTML = `<div>
        // ${task.text}
        // </div>`

        taskList.append(listItem)
    })
}

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  newTask()
});
