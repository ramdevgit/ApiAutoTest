import requests as re

'''
Cookie 识别用户
    缺点：cookie失效 
    每个接口都需要cookie
'''
url = "https://www.bagevent.com/account/dashboard"
r = re.get(url)
print(r.text)
url = "https://www.bagevent.com/account/dashboard"
headers = {
    "Cookie": "_ga=GA1.2.756889205.1611729447; _gid=GA1.2.464360822.1611729447; __auc=6bb991eb177428fa9eb3376360e; MEIQIA_TRACK_ID=1ndqXuAe0bvpL2oA5YDiTMXYsxR; __asc=60f68aa417747db70b1afcbc79b; Hm_lvt_1fc37bec18db735c69ebe77d923b3ab9=1611729447,1611818300; _gat=1; BAGSESSIONID=af04aaca-6201-40f1-a2ed-8d40d82e8c30; JSESSIONID=04F3D1584D787F78FF49767B655594CB; MEIQIA_VISIT_ID=1ngjCHyGuuw4R9CIgfRrK746UsH; Hm_lpvt_1fc37bec18db735c69ebe77d923b3ab9=1611818500; BAG_EVENT_TOKEN_=02de735f68204d51009e7edda78e58c13a3fcdd1; BAG_EVENT_CK_KEY_=\"2780487875@qq.com\"; BAG_EVENT_CK_TOKEN_=2440f5d17af838308ba4b390db81af38",
}
r = re.get(url, headers=headers)
print(r.text)
assert "<title>百格活动 - 账户总览</title>" in r.text