# coding:utf-8

import upyun

bucket = "ikitchen"
username = "vermouth"
password = "7040ct0212"
up = upyun.UpYun(bucket, username, password, timeout=30, endpoint=upyun.ED_AUTO)
print(up)
# a = up.put('/upyun-python-sdk/ascii.txt', 'abcdefghijklmnopqrstuvwxyz\n')

headers = {}

with open('xxx.png', 'rb') as f:
    res = up.put('/upyun-python-sdk/xxx.png', f, checksum=True, headers=headers)
    print(res)

