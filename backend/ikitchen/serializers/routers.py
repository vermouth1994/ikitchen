# coding: utf-8
from rest_framework import routers
from ikitchen.serializers.viewset import view as views


#Routers 提供了一种简单途径，自动地配置了URL。
router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'UserProfile', views.UserProfileViewSet)
router.register(r'Cookbook', views.CookbookViewSet)
router.register(r'Menu', views.MenuViewSet)