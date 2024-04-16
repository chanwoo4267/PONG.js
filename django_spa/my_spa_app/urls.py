from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.index, name='index'),
    path('api/home/', views.api_home_view, name='api-home'),
    path('api/login/', views.api_login_view, name='api-login'),
]