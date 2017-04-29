# coding:utf-8
from ikitchen.models import *
from django.http import HttpResponse
import json
import traceback


def get_cookbook_by_id(request):
    d = {}
    try:
        body = json.loads(request.body)
        cookbook_id = body.get("id")
        cbs = Cookbook.objects.get(id=int(cookbook_id))
        v_i = cbs.to_dict()
        v_i["material"] = json.loads(cbs.material)
        v_i["details"] = json.loads(cbs.details, strict=False)
        v_i["user_pic"] = UserProfile.objects.get(user_id=int(v_i["user_id"])).user_pic
        d["status"] = True
        d["content"] = v_i
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')


def get_cookbook_by_menu_id(request):
    d = {}
    try:
        result = []
        menu_id = request.GET.get("menu")
        menu_name = Menu.objects.get(id=menu_id).Mn_name
        cbs = Cookbook.objects.filter(subject__icontains=menu_name)
        for i in cbs:
            v_i = i.to_dict()
            result.append(v_i)
        d["status"] = True
        d["content"] = result
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')


def get_cookbook_by_name_key(request):
    d = {}
    try:
        result = []
        name = request.GET.get("name")
        cbs = Cookbook.objects.filter(name__icontains=name)
        for i in cbs:
            v_i = i.to_dict()
            v_i["score"] = float(i.score)
            v_i["do_num"] = int(i.do_num)
            result.append(v_i)
        d["status"] = True
        d["content"] = result
        pass
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')
