const todoApp = {
    tasks: [],
    createTaskElement(task, index) {
      const li = document.createElement('li');
      li.className = 'task';
  
      if (task.isEditing) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.description;
        input.onblur = () => this.saveTask(index, input.value);
        li.appendChild(input);
      } else {
        li.textContent = task.description;
      }
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Change';
        if (task.isEditing) {
        editButton.textContent = 'Save';
            }

      editButton.className = 'edit-btn';
      editButton.onclick = () => this.changeEditTask(index);
      li.appendChild(editButton);
  
      if (!task.isCompleted) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Done';
        completeButton.className = 'complete-btn';
        completeButton.onclick = () => this.completeTask(index);
        li.appendChild(completeButton);
      }
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-btn';
      deleteButton.onclick = () => this.deleteTask(index);
      li.appendChild(deleteButton);
  
      return li;
    },
    render() {
      const todoList = document.getElementById('todoList');
      const completedList = document.getElementById('completedList');
      todoList.innerHTML = '';
      completedList.innerHTML = '';
  
      this.tasks.forEach((task, index) => {
        const li = this.createTaskElement(task, index);
        if (task.isCompleted) {
          completedList.appendChild(li);
        } else {
          todoList.appendChild(li);
        }
      });
    },
  
    addTask() {
      const taskInput = document.getElementById('taskDescription');
      const errorElement = document.getElementById('error');
      const description = taskInput.value.trim();
  
      if (description === '') {
        errorElement.textContent = "Task cannot be empty!";
        return;
      }
  
      errorElement.textContent = '';
      this.tasks.push({ description, isEditing: false, isCompleted: false });
      taskInput.value = '';
      this.render();
    },
  
   
  
    
  
    changeEditTask(index) {
      this.tasks[index].isEditing = !this.tasks[index].isEditing;
      this.render();
    },
  
    saveTask(index, newDescription) {
      const errorElement = document.getElementById('error');
      if (newDescription.trim() === '') {
        errorElement.textContent = "Task cannot be empty!";
        return;
      }
  
      errorElement.textContent = '';
      this.tasks[index].description = newDescription.trim();
      this.tasks[index].isEditing = false;
      this.render();
    },
  
    completeTask(index) {
      this.tasks[index].isCompleted = true;
      this.render();
    },
  
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.render();
    },
    clearAllTasks() {
        this.tasks = [];
        this.render();
      }
    
  };
  
  document.getElementById('addTaskButton').onclick = () => todoApp.addTask();
  
  