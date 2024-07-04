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

// 할일 입력 요소와 버튼을 가져옴
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
// 탭과 관련된 요소를 가져옴
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");

let taskList = [];
let mode = "all";
let filterList = [];

// + 버튼 클릭 이벤트
addButton.addEventListener("click", addTask);

// Enter 키 입력 이벤트
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 탭 클릭 이벤트
tabs.forEach((tab) =>
  tab.addEventListener("click", function (event) {
    filter(event);
    moveUnderline(event);
  })
);

// 초기 밑줄 설정
window.onload = function () {
  underLine.style.width = tabs[0].offsetWidth + "px";
  underLine.style.left = tabs[0].offsetLeft + "px";
  underLine.style.top = underLine.style.top + underLine.style.height + "px";
};

// 할일 추가 함수
function addTask() {
  let taskContent = taskInput.value.trim();
  if (taskContent === "") {
    alert("Please enter a task.");
    return;
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskContent,
    isCompleted: false,
  };

  taskList.push(task);
  taskInput.value = ""; // 입력창 비우기
  render();
}

// UI 그려주는 로직
function render() {
  let list = mode === "all" ? taskList : filterList;
  let resultHTML = "";
  for (let task of list) {
    resultHTML += `<div class="task">
          <div class="${task.isCompleted ? "task-done" : ""}">${
      task.taskContent
    }</div>
          <div>
              <button class="icon-btn" onclick="toggleComplete('${task.id}')">
                  <i class="fas ${
                    task.isCompleted ? "fa-check-circle" : "fa-circle"
                  }"></i>
              </button>
              <button class="icon-btn" onclick="deleteTask('${task.id}')">
                  <i class="fas fa-trash"></i>
              </button>
          </div>
      </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

// 완료 상태 토글 적용
function toggleComplete(id) {
  for (let task of taskList) {
    if (task.id === id) {
      task.isCompleted = !task.isCompleted;
      break;
    }
  }
  applyFilter(); 
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  applyFilter();; // 값을 업데이트하면 UI도 반드시 업데이트 해주어야 한다.
}

// 필터링 로직
function filter(event) {
  mode = event.target.id;
  applyFilter();
}


// 필터 적용 및 UI 렌더링
function applyFilter() {
  filterList = taskList.filter(task => {
      if (mode === "all") return true;
      return mode === "inprogress" ? !task.isCompleted : task.isCompleted;
  });
  render();
}

// 밑줄 애니메이션
function moveUnderline(event) {
  tabs.forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.top = underLine.style.top + underLine.style.height + "px";
}

// 랜덤 ID 생성
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
