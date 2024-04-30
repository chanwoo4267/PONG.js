export function todo_js() {
    console.log("todo.js executed!");

    loadTasks();

    // Handle form submission for adding a new task
    $('#todoForm').submit(function (event) {
        event.preventDefault();
        let name = $('#nameInput').val();
        let description = $('#descriptionInput').val();

        // Create a new task
        axios.post("http://127.0.0.1:8000/api/items/", {
            name: name,
            description: description
        })
            .then(function (response) {
                // debug
                console.log('POST response:', response.data);

                // Clear form inputs
                $('#nameInput').val('');
                $('#descriptionInput').val('');

                // Append the new task to the list
                appendTask(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    return null;
}

// Function to load tasks from the server
function loadTasks() {
    axios.get('http://127.0.0.1:8000/api/items/')
        .then(function (response) {
            // debug
            console.log('GET response:', response.data);

            // Clear the task list
            $('#taskList').empty();

            // Append each task to the list
            if (Array.isArray(response.data)) {
                // Append each task to the list
                response.data.forEach(function (task) {
                    appendTask(task);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Function to append a task to the list
function appendTask(task) {
    // debug
    console.log('Appending task:', task);

    let taskItem = $('<li>').addClass('list-group-item');
    let taskName = $('<h5>').text(task.name);
    let taskDescription = $('<p>').text(task.description);
    let deleteButton = $('<button>').addClass('btn btn-danger btn-sm').text('Delete');

    deleteButton.on('click', function () {
        // Call deleteTask function when delete button is clicked
        deleteTask(task.id);
        taskItem.remove(); // delete UI immediately
    });

    taskItem.append(taskName, taskDescription, deleteButton);
    $('#taskList').append(taskItem);
}

// Function to delete task
function deleteTask(taskId) {
    fetch(`http://127.0.0.1:8000/api/items/${taskId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                // Item deleted successfully, update UI accordingly
                console.log('Item deleted successfully');
                // Optionally, update the UI to remove the deleted item from the task list
            } else {
                // Handle error response
                console.error('Failed to delete item');
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error deleting item:', error);
        });

}