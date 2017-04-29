# coding: utf-8
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
import datetime

''' 扩展用户表 '''


class UserProfile(models.Model):
    username = models.CharField(u'用户名', max_length=100, blank=True, null=True)
    user_id = models.IntegerField(u'用户id', blank=True, null=True)
    user_pic = models.CharField(u'用户头像', max_length=100, blank=True, null=True)
    description = models.TextField(max_length=51200, blank=True, null=True)
    sex = models.CharField(u'性别', max_length=100, blank=True, null=True)
    birthday = models.CharField(u'生日', max_length=100, blank=True, null=True)
    job = models.CharField(u'职业', max_length=100, blank=True, null=True)
    address = models.CharField(u'地址', max_length=500, blank=True, null=True)
    phone_num = models.CharField(u'手机号码', max_length=3000, blank=True, null=True)

    def to_dict(self):
        return dict([(attr, str(getattr(self, attr))) for attr in [f.name for f in self._meta.fields]])

    class Meta:
        ordering = ("-id",)
        verbose_name_plural = verbose_name = u'用户信息'


''' 菜谱表 '''


class Cookbook(models.Model):
    username = models.CharField(u'用户名', max_length=100, blank=True, null=True)
    user_id = models.IntegerField(u'用户id', blank=True, null=True)
    name = models.CharField(u'菜谱名', max_length=100, blank=True, null=True)
    subject = models.CharField(u'所属分类', max_length=100, blank=True, null=True)
    title_pic = models.CharField(u'缩略图', max_length=100, blank=True, null=True)
    pic = models.CharField(u'菜谱大图', max_length=100, blank=True, null=True)
    content = models.CharField(u'内容', max_length=3000, blank=True, null=True)
    material = models.TextField(u'用料', max_length=51200, blank=True, null=True)
    details = models.TextField(u'步骤', max_length=51200, blank=True, null=True)
    score = models.CharField(u'分数', max_length=51200, blank=True, null=True)
    favorite = models.IntegerField(u'收藏数', blank=True, null=True)
    do_num = models.IntegerField(u'做的人数', blank=True, null=True)
    time = models.DateTimeField(u'发布时间', auto_now_add=True)
    up_time = models.DateTimeField(u'更新时间', max_length=128, blank=True, null=True)

    def to_dict(self):
        return dict([(attr, str(getattr(self, attr))) for attr in [f.name for f in self._meta.fields]])

    class Meta:
        ordering = ("-id",)
        verbose_name_plural = verbose_name = u'菜谱'


''' 分类 '''


class Menu(models.Model):
    Mn_name = models.CharField(u'分类名', max_length=100, blank=True, null=True)
    pic = models.CharField(u'图片链接', max_length=512, blank=True, null=True)
    tag = models.CharField(u'分类依据', max_length=100, blank=True, null=True)

    def to_dict(self):
        return dict([(attr, str(getattr(self, attr))) for attr in [f.name for f in self._meta.fields]])

    class Meta:
        ordering = ("-id",)
        verbose_name_plural = verbose_name = u'分类'


''' 用户菜谱相关 '''


class UserCookInfo(models.Model):
    user_id = models.IntegerField(u'用户', blank=True, null=True)
    menu = models.TextField(u'我的菜谱', blank=True, null=True)
    product = models.TextField(u'我的作品', blank=True, null=True)
    like_menu = models.TextField(u'收藏的菜谱', blank=True, null=True)
    follow_menu = models.TextField(u'关注的菜谱', blank=True, null=True)
    follow_people = models.TextField(u'关注的人', blank=True, null=True)

    def to_dict(self):
        return dict([(attr, str(getattr(self, attr))) for attr in [f.name for f in self._meta.fields]])

    class Meta:
        ordering = ("-id",)
        verbose_name_plural = verbose_name = u'用户菜谱相关'


''' 用户搜索 '''


class AllSearch(models.Model):
    user_id = models.IntegerField(u'用户', blank=True, null=True)
    search_key = models.CharField(u'搜索词', max_length=1024, blank=True, null=True)
    count = models.IntegerField(u'搜索次数', blank=True, null=True, default=1)
    search_time = models.DateTimeField(u'搜索时间', auto_now_add=True)
    clear_time = models.DateTimeField(u'清空时间', max_length=128, blank=True, null=True,
                                      default=datetime.datetime(2017, 2, 1))

    def to_dict(self):
        return dict([(attr, str(getattr(self, attr))) for attr in [f.name for f in self._meta.fields]])

    class Meta:
        ordering = ("-id",)
        verbose_name_plural = verbose_name = u'用户搜索'
