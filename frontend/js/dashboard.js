document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.querySelector(".bg-primary-500");
    const todoList = document.querySelector(".border:nth-of-type(1) ul");
    const inProgressList = document.querySelector(".border:nth-of-type(2) ul");
    const completedList = document.querySelector(".border:nth-of-type(3) ul");

    // ������� ��� ���������� ����� ������
    function addTask() {
        const taskItem = createTaskElement("", "");
        todoList.appendChild(taskItem);
        const inputField = taskItem.querySelector(".task-input");
        inputField.focus();
    }

    // ������� ��� �������� �������� ������
    function createTaskElement(taskName, taskDescription) {
        const taskItem = document.createElement("li");
        taskItem.className = "bg-white rounded-md p-3 shadow-sm flex flex-col gap-2";

        // �������� ������
        const nameContainer = document.createElement("div");
        nameContainer.className = "flex justify-between items-center";

        const inputField = document.createElement("textarea");
        inputField.className = "task-input w-full border border-gray-300 rounded-md p-2 resize-none";
        inputField.value = taskName;
        inputField.placeholder = "Enter task name";
        inputField.style.height = "auto"; // �������������� ������
        inputField.addEventListener("input", autoResize); // �������������� ������
        inputField.addEventListener("blur", () => saveTaskName(inputField));
        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveTaskName(inputField);
            }
        });

        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "flex gap-2";

        const editButton = document.createElement("button");
        editButton.className = "bg-primary-500 text-primary-50 w-[32px] h-[32px] rounded-md text-center";
        editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
        editButton.addEventListener("click", () => editTask(inputField));

        const moveUpButton = document.createElement("button");
        moveUpButton.className = "bg-primary-500 text-primary-50 w-[32px] h-[32px] rounded-md text-center move-up";
        moveUpButton.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
        moveUpButton.addEventListener("click", () => moveTask(taskItem, "up"));

        const moveDownButton = document.createElement("button");
        moveDownButton.className = "bg-primary-500 text-primary-50 w-[32px] h-[32px] rounded-md text-center move-down";
        moveDownButton.innerHTML = '<span class="material-symbols-outlined">arrow_downward</span>';
        moveDownButton.addEventListener("click", () => moveTask(taskItem, "down"));

        const deleteButton = document.createElement("button");
        deleteButton.className = "bg-red-500 text-primary-50 w-[32px] h-[32px] rounded-md text-center";
        deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        deleteButton.addEventListener("click", () => deleteTask(taskItem));

        buttonsContainer.append(editButton, moveUpButton, moveDownButton, deleteButton);
        nameContainer.append(inputField, buttonsContainer);

        // �������� ������
        const descriptionField = document.createElement("textarea");
        descriptionField.className = "task-description w-full border border-gray-300 rounded-md p-2 resize-none";
        descriptionField.placeholder = "Enter task description";
        descriptionField.value = taskDescription;
        descriptionField.style.height = "auto"; // �������������� ������
        descriptionField.addEventListener("input", autoResize);

        taskItem.append(nameContainer, descriptionField);
        updateMoveButtons(taskItem);

        return taskItem;
    }

    // �������������� ������ ������ � ������ ��� ���� �����
    function autoResize(event) {
        const element = event.target;
        element.style.height = "auto"; // �������������� ������
        element.style.height = `${element.scrollHeight}px`;

        element.style.width = "auto"; // �������������� ������
        element.style.width = `${Math.min(element.scrollWidth, 600)}px`; // ����������� �� 600px
    }

    // ������� ��� ���������� ����� ������
    function saveTaskName(inputField) {
        const taskName = inputField.value.trim();
        if (!taskName) {
            inputField.focus(); // ���� ���� ������, ���������� �����
        }
    }

    // ������� ��� �������������� ������
    function editTask(inputField) {
        inputField.classList.remove("hidden");
        inputField.focus();
    }

    // ������� ��� ����������� ������
    function moveTask(taskItem, direction) {
        const currentList = taskItem.parentElement;
        if (direction === "up") {
            if (currentList === inProgressList) {
                todoList.appendChild(taskItem);
            } else if (currentList === completedList) {
                inProgressList.appendChild(taskItem);
            }
        } else if (direction === "down") {
            if (currentList === todoList) {
                inProgressList.appendChild(taskItem);
            } else if (currentList === inProgressList) {
                completedList.appendChild(taskItem);
            }
        }
        updateMoveButtons(taskItem);
    }

    // ������� ��� ���������� ������ �����������
    function updateMoveButtons(taskItem) {
        const currentList = taskItem.parentElement;
        const moveUpButton = taskItem.querySelector(".move-up");
        const moveDownButton = taskItem.querySelector(".move-down");

        moveUpButton.style.display = currentList === todoList ? "none" : "flex";
        moveDownButton.style.display = currentList === completedList ? "none" : "flex";
    }

    // ������� ��� �������� ������
    function deleteTask(taskItem) {
        if (confirm("Are you sure you want to delete this task?")) {
            taskItem.remove();
        }
    }

    // ��������� �� ������ Add Task
    addTaskButton.addEventListener("click", addTask);
});
