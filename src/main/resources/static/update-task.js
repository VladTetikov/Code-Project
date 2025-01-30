document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("id");

    if (!taskId) {
        alert("No task selected!");
        window.location.href = "tasks.html";
        return;
    }

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const statusInput = document.getElementById("status");
    const priorityInput = document.getElementById("priority");


    fetch(`http://34.27.237.197:8080/api/task/${taskId}`)
        .then(response => {
            if (!response.ok) throw new Error("Task not found.");
            return response.json();
        })
        .then(task => {
            titleInput.value = task.title;
            descriptionInput.value = task.description;
            priorityInput.value = task.priority;

        })
        .catch(error => {
            alert(error.message);
            window.location.href = "index.html";
        });


    const saveButton = document.getElementById("save-btn");
    saveButton.addEventListener("click", async () => {
        const updatedTask = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            priority: parseInt(document.getElementById("priority").value),
        };
        try {
            const response = await fetch(`http://34.27.237.197:8080/api/task/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const savedTask = await response.json();
            alert("Task updated successfully!");
            window.location.href = "index.html";
        } catch (error) {
            console.error("Failed to update task:", error);
            alert("Failed to update task. Please try again.");
        }
    });
});
