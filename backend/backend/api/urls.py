from django.urls import path
from .views import * 
urlpatterns = [
    path('resize/', get_resize_data),
    path('flip/', get_flip_data),
    path('filter/', get_filter_data),
    path('show-resized/', showResized),
    path('show-fliped/', showFliped),
    path('show-filter/', showFiltered),
]