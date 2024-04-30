export function home_html() {
    return `
    <div class="container mt-5 min-vh-100">
        <div class="row align-items-center">
            <div class="col-md-6">
                <h1> Welcome! </h1>
            </div>

            <div class="col-md-6">
                <h3> This is description Location </h3>
                <a href="/#todo" class="btn btn-primary">Go TodoList</a>
                <a href="/#pong" class="btn btn-primary">Go PongGame</a>
            </div>
        </div>
    </div>
    `;
}