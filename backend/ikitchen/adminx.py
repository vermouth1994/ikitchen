# coding:utf-8
import xadmin

''' Model的后台显示和编辑功能调整 '''
from models import *


class GlobalSetting(object):
    site_title = 'Kitchen'
    site_footer = 'yasongxu @2017'


xadmin.site.register(xadmin.views.CommAdminView, GlobalSetting)


class CookbookAdmin(object):
    list_display = (
        'id', 'username', 'name', 'subject', 'score', 'favorite', 'title_pic', 'do_num', 'time',
        'up_time')
    search_fields = ['id', 'username', 'title_pic', 'subject', 'score', 'name', 'material', 'details', 'favorite',
                     'do_num']


class UserProfileAdmin(object):
    list_display = (
        'id', 'username', 'description', 'sex', 'birthday', 'job', 'address', 'phone_num')
    search_fields = ['id', 'username', 'description', 'sex', 'birthday', 'job', 'address', 'phone_num']


class MenuAdmin(object):
    list_display = ('id', 'Mn_name', "pic", 'tag')
    search_fields = ['Mn_name', "pic", 'tag']


class UserCookInfoAdmin(object):
    list_display = ('user_id', 'menu', "product", 'like_menu', 'follow_menu', 'follow_people')
    search_fields = ['user_id', 'menu', "product", 'like_menu', 'follow_menu', 'follow_people']


class AllSearchAdmin(object):
    list_display = ('user_id', 'search_key', 'count', 'search_time')
    search_fields = ['user_id', 'search_key', 'count', 'search_time']


xadmin.site.register(Cookbook, CookbookAdmin)
xadmin.site.register(Menu, MenuAdmin)
xadmin.site.register(UserProfile, UserProfileAdmin)
xadmin.site.register(UserCookInfo, UserCookInfoAdmin)
xadmin.site.register(AllSearch, AllSearchAdmin)