from django.urls import path

from api import views


urlpatterns = [
    path('auth/login', views.login),
    path('auth/logout', views.logout),
    path('me', views.me),
]
