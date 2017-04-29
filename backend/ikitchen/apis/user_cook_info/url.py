# coding:utf-8
from django.conf.urls import patterns
from .view import get_like_menu

urlpatterns = patterns(
    '',
    (r'^like_menu/$', get_like_menu),
)

