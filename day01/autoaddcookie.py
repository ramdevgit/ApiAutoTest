'''
requests.session 来保持状态 自动管理过程中产生的cookie
下次请求自动带上cookie
'''
import requests as re
import requests.utils

se = re.session()
url = "https://www.bagevent.com/user/login"
data = {
    "account": "2780487875@qq.com",
    "password": "qq2780487875",
    "access_type": "1",
    "loginType": "1",
    "emailLoginWay": "0",
    "remindmeBox": "on",
    "remindme": "1",
}
print(re.utils.dict_from_cookiejar(se.cookies))
se.post(url, data=data)
url = "https://www.bagevent.com/account/dashboard"
r = se.get(url)
print(re.utils.dict_from_cookiejar(se.cookies))
url = "https://www.bagevent.com/user/login_out"
se.get(url)
print(re.utils.dict_from_cookiejar(se.cookies))
# print(r.text)
