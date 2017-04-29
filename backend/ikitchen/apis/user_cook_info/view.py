# coding:utf-8
from ikitchen.models import UserCookInfo, Cookbook
from django.http import HttpResponse
import json
import traceback


def get_like_menu(request):
    d = {}
    try:
        input = "肉"
        obj = UserCookInfo.objects.get(user_id=1)
        like_menu_name = Cookbook.objects.filter(id__in=json.loads(obj.like_menu)).values_list("name", 'id')
        result = []
        for i in like_menu_name:
            if input in i[0]:
                x = {"id": i[1], "name": i[0]}
                result.append(x)
        d["status"] = True
        d["content"] = result
    except Exception, e:
        traceback.print_exc()
        d["status"] = False
        d["content"] = str(e)
    return HttpResponse(json.dumps(d), content_type='application/json')
