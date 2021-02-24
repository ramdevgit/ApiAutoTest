"""
接口测试：
    使用requests 的get、post方法调用接口，检查返回值
"""
import requests

# 回去用户列表的接口
# url = "http://jy001:8081/futureloan/mvc/api/member/list";
# r = requests.get(url);
# print(r.text);
# assert r.status_code == 200
# assert r.reason == "OK"
# rjson = r.json()
# assert rjson['status'] == 1
# assert rjson['code'] == '10001'
# assert rjson['msg'] == '获取用户列表成功'
# print(r.headers)
# {'Server': 'Apache-Coyote/1.1', 'Content-Type': 'application/json;charset=UTF-8', 'Transfer-Encoding': 'chunked', 'Date': 'Thu, 28 Jan 2021 01:52:13 GMT'}
# url = "http://jy001:8081/futureloan/mvc/api/member/login"
# url = "http://jy001:8081/futureloan/mvc/api/member/register"
# params = {"mobilephone": "18792533140", "pwd": "122222"}
# r = requests.get(url, params)
# # r = requests.post(url, params)
# print(r.text)
# print(r.status_code)
# print(r.reason)
# rjson = r.json()
# assert rjson['status'] == 0
# assert rjson['code'] == '20110'
# assert rjson['msg'] == '手机号码已被注册'
url = "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm"
params = {"tel":"18792533140"}
params = {"tel":"18888888888"}
res = requests.get(url,params)
print(res.text)
assert "陕西移动" in res.text,"断言错误"

