document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const modifyTaskButton = document.getElementById("modify-task-button");
    const deleteTaskButton = document.getElementById("delete-task-button");

    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'http://34.27.237.197:8080/api/task'
        : 'http://localhost:8080/api/task';

    let selectedTaskId = null;

    function fetchTasks() {
        fetch(baseUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks.");
                }
                return response.json();
            })
            .then((tasks) => {
                renderTasks(tasks);
            })
            .catch((error) => {
                taskList.innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    function renderTasks(tasks) {
        taskList.innerHTML = ""; // Clear previous tasks

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tasks found.</p>";
            return;
        }

        const table = document.createElement("table");
        table.className = "task-table";

        const headerRow = document.createElement("tr");
        const headers = ["Title", "Description", "Priority", "Date Created", "Date Modified", "Status"];
        headers.forEach((header, index) => {
            const th = document.createElement("th");
            th.textContent = header;
            th.addEventListener("click", () => sortTable(index, tasks));
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        tasks.forEach((task) => {
            const taskRow = document.createElement("tr");

            const formattedDateCreated = formatDate(task.dateCreated);
            const formattedDateModified = formatDate(task.dateModified);

            taskRow.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.priority}</td>
                <td>${formattedDateCreated}</td>
                <td>${formattedDateModified}</td>
                <td class="task-status" data-id="${task.id}" style="cursor: pointer;">
                    ${task.status ? "✅" : "❌"}
                </td>
            `;

            taskRow.addEventListener("click", () => {
                if (selectedTaskId !== task.id) {
                    const selectedRow = document.querySelector("tr.selected");
                    if (selectedRow) {
                        selectedRow.classList.remove("selected");
                    }
                    taskRow.classList.add("selected");
                    selectedTaskId = task.id;
                    modifyTaskButton.disabled = false;
                    deleteTaskButton.disabled = false;
                }
            });

            taskRow.querySelector(".task-status").addEventListener("click", (event) => {
                event.stopPropagation();
                toggleTaskStatus(task.id, !task.status);
            });
            table.appendChild(taskRow);
        });
        taskList.appendChild(table);
    }

    let currentSortOrder = {};

    function sortTable(index, tasks) {
        // Toggle the sort order for the current column
        if (currentSortOrder[index] === 'asc') {
            currentSortOrder[index] = 'desc';
        } else {
            currentSortOrder[index] = 'asc';
        }

        // Sort the tasks array
        const sortedTasks = tasks.sort((a, b) => {
            const key = Object.keys(a)[index + 1]; // Get the key for the current column
            const aValue = a[key]; // Get the value for task A
            const bValue = b[key]; // Get the value for task B
            // Perform the comparison based on the sort order
            if (currentSortOrder[index] === 'asc') {
                return aValue - bValue; // Ascending order for integers
            } else {
                return bValue - aValue; // Descending order for integers
            }
        });

        // Render the sorted tasks
        renderTasks(sortedTasks);
    }

    modifyTaskButton.addEventListener("click", () => {
        if (selectedTaskId) {
            window.location.href = `update-task.html?id=${selectedTaskId}`;
        }
    });

    function toggleTaskStatus(taskId, newStatus) {
        fetch(`${baseUrl}/${taskId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStatus)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to update task status.");
                return response.json();
            })
            .then(() => {
                fetchTasks();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    deleteTaskButton.addEventListener("click", () => {
        if (selectedTaskId) {
            fetch(`${baseUrl}/${selectedTaskId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to delete task.");
                    }
                    fetchTasks();
                    modifyTaskButton.disabled = true;
                    deleteTaskButton.disabled = true;
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    });
    fetchTasks();
});
