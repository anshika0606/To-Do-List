document.addEventListener("DOMContentLoaded",()=>{
    const storedtask=JSON.parse(localStorage.getItem('tasks'));
    if(storedtask){
        storedtask.forEach((task)=>tasks.push(task));
        updateTaskList();
        updatestats();
    }
});

let tasks = [];

const savetask=()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));

};
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updatestats();
        savetask();        
    } 
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing task list

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${
                        task.completed ? 'checked' : ''
                    } onclick="toggleTask(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./edit.png" onclick="editTask(${index})" />
                    <img src="./delete.png" onclick="deleteTask(${index})" />
                </div>
            </div>`;
        taskList.append(listItem);
    });
    updatestats();
};

document.getElementById("newtask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updatestats();
    if (tasks[index].completed) {
        firework();
    }
    savetask();
};

const editTask = (index) => {
    const taskInput=document.getElementById('taskInput');
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updatestats();
    savetask();
    };

const updatestats=()=>{
    const completedtask=tasks.filter((task)=>task.completed).length;
    const totaltasks=tasks.length;
    const progress=(completedtask/totaltasks)*100;
    const progressBar=document.getElementById('progress');
    progressBar.style.width=`${progress}%`;

    document.getElementById("numbers").innerText=`${completedtask} / ${totaltasks}`;
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updatestats();
    savetask();
};

const firework=()=>{
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    const particleCount = 50 * (timeLeft / duration);
  
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}