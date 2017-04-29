# coding=utf-8
from django.conf.urls import patterns, include, url
from ikitchen.serializers.routers import router

''' restful api '''
urlpatterns = [
    url(r'^apis/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

import xadmin

xadmin.autodiscover()

''' version模块自动注册需要版本控制的 Model '''
from xadmin.plugins import xversion

xversion.register_models()

urlpatterns += patterns('',
                        url(r'xadmin/', include(xadmin.site.urls)),
                        url(r'^api/cookbook/', include("ikitchen.apis.cookbook.url")),
                        url(r'^api/menu/', include("ikitchen.apis.menu.url")),
                        url(r'^api/search/', include("ikitchen.apis.search_info.url")),
                        url(r'^api/user_cook/', include("ikitchen.apis.user_cook_info.url")),
)



