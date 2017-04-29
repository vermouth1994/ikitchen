# coding:utf-8
from django.conf.urls import patterns
from .view import get_relate_key, get_hot_recent_key, insert_my_search, clear_my_search

urlpatterns = patterns(
    '',
    (r'^relate/$', get_relate_key),
    (r'^hot_recent/$', get_hot_recent_key),
    (r'^clear/$', clear_my_search),
    (r'^insert/$', insert_my_search),
)

