$(document).ready(function() {
    // Load tasks on page load
    loadTasks();
  
    // Handle form submission for adding a new task
    $('#todoForm').submit(function(event) {
      event.preventDefault();
      let name = $('#nameInput').val();
      let description = $('#descriptionInput').val();
  
      // Create a new task
      axios.post("http://127.0.0.1:8000/api/items/", {
        name: name,
        description: description
      })
      .then(function(response) {
        // debug
        console.log('POST response:', response.data);

        // Clear form inputs
        $('#nameInput').val('');
        $('#descriptionInput').val('');
  
        // Append the new task to the list
        appendTask(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    });
  });
  
  // Function to load tasks from the server
  function loadTasks() {
    axios.get('http://127.0.0.1:8000/api/items/')
      .then(function(response) {
        // debug
        console.log('GET response:', response.data);

        // Clear the task list
        $('#taskList').empty();
  
        // Append each task to the list
        if (Array.isArray(response.data)) {
            // Append each task to the list
            response.data.forEach(function(task) {
              appendTask(task);
            });
        }
      })
      .catch(function(error) {
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
  
    taskItem.append(taskName, taskDescription);
    $('#taskList').append(taskItem);
  }