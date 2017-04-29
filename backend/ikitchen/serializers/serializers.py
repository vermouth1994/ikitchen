# coding: utf-8
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from ikitchen.models import *


# Serializers定义了API的表现.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            'url', 'username', 'description', 'birthday', 'job', 'address', 'phone_num', 'Us_menu', 'Us_like_menu')


class CookbookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cookbook
        fields = (
            'url', 'username', 'name', 'subject', 'score', 'title_pic', 'content',
            'material', 'details',
            'favorite', 'do_num',
            'time', 'up_time')


class MenuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Menu
        fields = ('url', 'Mn_name', 'tag', "pic", "id")
