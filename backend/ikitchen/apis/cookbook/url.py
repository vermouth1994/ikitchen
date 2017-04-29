# coding:utf-8
from django.conf.urls import patterns
from cookbook_info import get_cookbook_by_menu_id, get_cookbook_by_name_key, get_cookbook_by_id

urlpatterns = patterns(
    '',
    (r'^by_menu/$', get_cookbook_by_menu_id),
    (r'^by_name/$', get_cookbook_by_name_key),
    (r'^by_cookbook_id/$', get_cookbook_by_id),
)

