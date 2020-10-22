from django.urls import include, path

from .views import (productshomelist,shopfilter,singleproduct,getbrands,
                    categoryviewset,productfilter)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('category', categoryviewset, basename='category')


urlpatterns = [
    path('', include(router.urls)),
    path('products-home-list/', productshomelist.as_view()),
    path('products-shop-list/', shopfilter.as_view()),
    path('single/<pk>/', singleproduct.as_view()),
    path('productfilter/', productfilter.as_view()),
    path('brands/', getbrands.as_view()),


]