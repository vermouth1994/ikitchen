# coding:utf-8
from ikitchen.models import *
from django.http import HttpResponse
import json
import traceback


def get_all_menus(request):
    d = {}
    try:
        result = []
        tags = ["热门分类", "菜式"]
        for i in tags:
            menus = Menu.objects.filter(tag=i)
            data = []
            for m in menus:
                x = {"id": m.id, "Mn_name": m.Mn_name, "pic": m.pic}
                data.append(x)
            x = {"tag": i, "data": data}
            result.append(x)
        d["status"] = True
        d["content"] = result
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')
