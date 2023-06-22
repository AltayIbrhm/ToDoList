// Get DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const inProgressList = document.getElementById('inprogress-list');
const doneList = document.getElementById('done-list');

// Handle form submission
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    const taskItem = createTaskItem(taskName);
    todoList.appendChild(taskItem);
    taskInput.value = ''; // Clear the input field
  }
});

// Create a new task item
function createTaskItem(taskName) {
  const li = document.createElement('li');
  li.textContent = taskName;
  li.classList.add('task-item');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', deleteTask);
  li.appendChild(deleteBtn);

  // Add event listener to move task to "In Progress" list
  li.addEventListener('click', function() {
    moveTask(this, inProgressList);
  });

  return li;
}

// Move task item to a different list or delete it
function moveTask(taskItem, newList) {
    const currentList = taskItem.parentNode;
    
    if (newList === null) {
      taskItem.remove(); // Delete the task item
    } else {
      newList.appendChild(taskItem); // Move the task item to the new list
    
      // Update event listener based on the new list
      if (newList === doneList) {
        taskItem.removeEventListener('click', moveTask);
        taskItem.classList.add('completed');
      } else {
        taskItem.addEventListener('click', function() {
          moveTask(this, doneList);
        });
        taskItem.classList.remove('completed');
      }
    }
  }
  
// Delete a task
function deleteTask(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent li
  
    const taskItem = event.target.closest('.task-item');
    if (taskItem) {
      const parentList = taskItem.parentNode;
      parentList.removeChild(taskItem);
    }
  }
  
  