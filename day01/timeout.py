'''
上传文件的接口 可以设置超时时间
接口性能测试 看接口是否在某个时间内返回
'''
import requests as re
url = 'http://jy001:8081/futureloan/mvc/api/member/list'
for i in range(10):
    try:
        r = re.get(url,timeout=0.05)
        print(r.text)
    except Exception as e:
        print(e)