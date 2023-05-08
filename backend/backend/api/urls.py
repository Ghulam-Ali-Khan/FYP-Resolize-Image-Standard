from django.urls import path
from .views import * 
urlpatterns = [
    path('resize/', get_resize_data),
    path('flip/', get_flip_data),
    path('filter/', get_filter_data),
    path('resolize/', get_resolized_data),
    path('show-resized/', showResized),
    path('show-fliped/', showFliped),
    path('show-filter/', showFiltered),
    path('show-resolize/', showResolized),
    path('show-resize-data/', show_resized_data),
    path('show-fliped-data/', show_fliped_data),
    path('show-filter-data/', show_filter_data),
    path('show-resolize-data/', show_resolize_data),
]