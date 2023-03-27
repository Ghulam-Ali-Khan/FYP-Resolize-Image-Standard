from django.urls import path
from .views import * 
urlpatterns = [
    path('resize/', get_resize_data),
    path('show-resized/', showResized),
]