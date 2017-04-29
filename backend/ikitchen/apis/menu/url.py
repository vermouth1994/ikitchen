# coding:utf-8
from django.conf.urls import patterns
from menu_info import get_all_menus

urlpatterns = patterns(
    '',
    (r'^all/$', get_all_menus),

)

