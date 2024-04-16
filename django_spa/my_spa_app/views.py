from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'index.html', {'version': str(id(index))})

def api_home_view(request):
    home_data = {
        'html': """
            <h2>Home</h2>
            <p>This is the home content.</p>
        """
    }
    return JsonResponse(home_data)

def api_login_view(request):
    login_data = {
        'html': """
            <h2>Login</h2>
            <form>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username"><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"><br>
                <button type="submit">Login</button>
            </form>
        """
    }
    return JsonResponse(login_data)