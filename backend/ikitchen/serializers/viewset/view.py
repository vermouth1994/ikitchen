#coding: utf-8
from django.contrib.auth.models import User, Group
from ikitchen.models import *
from rest_framework import viewsets
from ikitchen.serializers.serializers import *


# ViewSets 定义了 视图（view） 的行为.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class CookbookViewSet(viewsets.ModelViewSet):
    queryset = Cookbook.objects.all()
    serializer_class = CookbookSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
