# coding:utf-8
from ikitchen.models import AllSearch, UserCookInfo, Cookbook
from django.http import HttpResponse
import json
import traceback
from django.db.models import Sum
from collections import OrderedDict
import datetime

''' 在用户搜索时，根据搜索内容获取符合条件的热门搜索及个人收藏中的命中项 '''


def get_relate_key(request):
    d = {}
    try:
        body = json.loads(request.body)
        input = body.get("input")
        key_dic = {}
        all_obj = AllSearch.objects.filter(search_key__icontains=input).values('search_key').annotate(
            s_amount=Sum('count')).order_by('s_amount')
        for i in all_obj:
            print(i["s_amount"])
            key_dic[i["search_key"]] = i["s_amount"]
        ''' 根据搜索条件 获取我的收藏中符合条件的 '''
        obj = UserCookInfo.objects.get(user_id=1)
        like_menu_name = Cookbook.objects.filter(id__in=json.loads(obj.like_menu)).values_list("name", 'id')
        result = []
        for i in like_menu_name:
            if input in i[0]:
                x = {"id": i[1], "name": i[0]}
                result.append(x)
        d["status"] = True
        d["content"] = {"hot": OrderedDict(sorted(key_dic.items(), key=lambda t: t[1], reverse=True)), "like": result}
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')


''' 在进入搜索页面时，获取热门搜索和当前用户的最近1个月的搜索 '''


def get_hot_recent_key(request):
    d = {}
    try:
        content = {"recent": [], "hot": []}
        ''' 获取我最近1个月的搜索内容 '''
        now = datetime.datetime.now()
        now_30_day = now - datetime.timedelta(days=30)
        all_obj = AllSearch.objects.filter(search_time__gte=now_30_day, user_id="1").order_by(
            '-search_time')
        for i in all_obj:
            if i.search_time >= i.clear_time:
                content["recent"].append(i.search_key)
        content["recent"] = content["recent"][:10]
        ''' 获取所有人的搜索中热门top10'''
        all_ = AllSearch.objects.filter(search_time__gte=now_30_day).values('search_key').annotate(
            s_amount=Sum('count')).order_by('s_amount')
        for a in all_[:20]:
            content["hot"].append(a["search_key"])
        d["status"] = True
        d["content"] = content
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')


''' 清空我的搜索，只是clear的时间推迟为新的时间，并非真的删除'''


def clear_my_search(request):
    try:
        AllSearch.objects.filter(user_id="1").update(clear_time=datetime.datetime.now())
        return HttpResponse(json.dumps({"status": True}))
    except:
        traceback.print_exc()
        return HttpResponse(json.dumps({"status": False}))


''' 插入新的搜索记录'''


def insert_my_search(request):
    try:
        body = json.loads(request.body)
        search_input = body.get("input")
        existed = AllSearch.objects.filter(search_key=search_input)
        if len(existed) > 0:
            existed.update(count=existed[0].count + 1, search_time=datetime.datetime.now())
        else:
            AllSearch.objects.create(
                user_id="1",
                search_key=search_input,
                clear_time=datetime.datetime.now()
            )
        return HttpResponse(json.dumps({"status": True}))
    except:
        traceback.print_exc()
        return HttpResponse(json.dumps({"status": False}))






