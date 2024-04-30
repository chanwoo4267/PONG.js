export function todo_html() {
    return `
    <div class="container mt-5">
        <a href="/#" class="btn btn-primary">Go Home</a>
        <h1 class="text-center">Todo List</h1>
        <div class="row mt-4">
            <div class="col-md-6 offset-md-3">
                <form id="todoForm">
                    <div class="form-group">
                        <input type="text" class="form-control" id="nameInput" placeholder="Task Name">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" id="descriptionInput" rows="3" placeholder="Task Description"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Task</button>
                </form>
                <ul id="taskList" class="list-group">
                    <!-- Tasks will be dynamically populated here -->
                </ul>
            </div>
        </div>
    </div>
    `;
}