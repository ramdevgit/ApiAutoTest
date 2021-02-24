import requests as re

# url = "http://www.httpbin.org/post"
url = "http://localhost:8080/carRental/file/uploadFile.action"
# url = "http://192.168.150.70:8089/carRental/file/uploadFile.action"
file = "G:/1.jpg"
headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
}
with open(file, mode="rb") as f:
    con = {"mf": (file, f, "image/jpg")}
    r = re.post(url, files=con)
    print(r.text)
    imgpath = r.json()['data']['src']

url = "http://localhost:8080/carRental/car/addCar.action"
data = {"carnumber": "测试ss",
        "cartype": "fdfd",
        "color": "red",
        "carimg": imgpath,
        "description": "测试",
        "price": "11111111",
        "rentprice": "1111",
        "deposit": "11111",
        "isrenting": "0"}
r = re.post(url, headers=headers, data=data)
print(r.text)
