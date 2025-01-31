document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.getElementById("create-task-form");
    const backToTasks = document.getElementById("back-to-tasks")


    createForm.addEventListener("submit", event => {
        event.preventDefault();

        const newTask = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            priority: parseInt(document.getElementById("priority").value, 10),
        };

        fetch(`api/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(() => {
                alert("Task created successfully!");
                createForm.reset();
            });
    });

    backToTasks.addEventListener("click", ()=> {
        window.location.href = `index.html`;
    });
});


