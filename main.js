// 1. User inputs task
// 2. When user clicks + button, then task will be added.
// 3. When user clicks Delete button, then task will be deleted.
//    When user clicks Check button, then task will be done and strikethrough will be applied.
//    - IsCompleted: true -> false
//    - if IsCompleted == true => strikethrough will be applied.
//    - else => IsCompleted: false
// 4. When user clicks 'In process', 'Done' on the tab, then it will be moved.
//    - In process => Show in processing tasks
//    - Done => Show done tasks
//    - All => Show all tasks

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all'
let filterList=[]
addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++){
  tabs[i].addEventListener("click", function(event){filter(event)})
}
console.log(tabs);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isCompleted: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

// UI 그려주는 로직
function render() {
  let list = []
  if (mode === "all"){
    list = taskList;
  } else if (mode === "inprogress" || mode === "done"){
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted == true) {
      resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isCompleted = !taskList[i].isCompleted; // 체크 표시 ON/OFF (true/false 왔다갔다)
      break;
    }
  }
  render(); // UI 업데이트 함수 호출 필수!
  console.log(taskList);
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render(); // 값을 업데이트하면 UI도 반드시 업데이트 해주어야 한다.
}

function filter(event){
  mode = event.target.id;
  filterList = [];
  if(mode === "all"){
    render();
  }else if(mode === "inprogress"){
    //task.isCompleted=false;
    for(let i=0;i<taskList.length;i++){
      if (taskList[i].isCompleted===false){
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행 중", filterList);
  } else if(mode ==="done"){
    //task.isCompleted=true;
    for(let i=0;i<taskList.length;i++){
      if (taskList[i].isCompleted===true){
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("완료", filterList);
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
