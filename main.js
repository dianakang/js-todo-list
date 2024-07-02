// 1. User inputs task
// 2. When user clicks + button, then task will be added.
// 3. When user clicks Delete button, then task will be deleted.
//    When user clicks Check button, then task will be done and strikethrough will be applied.
// 4. When user clicks 'In process', 'Done' on the tab, then it will be moved. 
//    - In process => Show in processing tasks
//    - Done => Show done tasks
//    - All => Show all tasks

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0;i<taskList.length; i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}