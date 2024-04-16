let showHome, showLogin, fetchAndDisplayContent, updateHistory;

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('app-container');

    showHome = function() {
        // Fetch and display the home content
        fetchAndDisplayContent('/api/home/');
        updateHistory('/home', 'Home');
    };

    showLogin = function() {
        // Fetch and display the login form
        fetchAndDisplayContent('/api/login/');
        updateHistory('/login', 'Login');
    };

    fetchAndDisplayContent = function(url) {
        fetch(url)
            .then(response => {
                if (response.headers.get('Content-Type').includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (typeof data === 'string') {
                    container.innerHTML = data;
                } else {
                    container.innerHTML = data.html;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    updateHistory = function(path, title) {
        window.history.pushState({ path: path }, title, path);
    };

    window.addEventListener('popstate', function(event) {
        fetchAndDisplayContent('/api' + event.state.path);
    });

    // Manually push initial state into the history
    updateHistory(window.location.pathname, document.title);

    // Initial content load
    showHome();
});