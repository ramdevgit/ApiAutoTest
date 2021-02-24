import requests as re

# url = "http://jy001:8081/futureloan/mvc/api/member/login"
# data = {"mobilephone": "18792533140", "pwd": "122222"}
# res = re.post(url, data)
# print(res.text)
# rjson = res.json()
# assert rjson['status'] == 1
# assert rjson['code'] == "10001"
# assert rjson['msg'] == "登录成功"
# json 格式的数据 content-type:application/json
# url = 'http://www.httpbin.org/post'
# data = {"mobilephone": "18792533140", "pwd": "122222"}
# r = re.post(url,data)
# print(r.text)
# r = re.post(url,json=data)
# print(r.text)
url = "http://localhost:8080/carRental/car/addCar.action"
# 请求头
headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
    "Cookie": "JSESSIONID=C62DC986F538AC2CAE8DF0685764CB72; lang=zh-cn; theme=default; keepLogin=false; pagerUserAdmin=10",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
}
data = {"carnumber": "ssssssss",
        "cartype": "fdfd",
        "color": "red",
        "carimg": "images/defaultcarimage.jpg",
        "description": "测试",
        "price": "11111111",
        "rentprice": "1111",
        "deposit": "11111",
        "isrenting": "0"}
r = re.post(url,data,headers=headers)
print(r.text)