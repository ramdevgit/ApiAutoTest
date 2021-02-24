'''
1、get\post方法做一下异常处理
2、打印日志
3、保持会话使用session发送请求
'''
import requests


class BaseRequests:
    # 构造方法创建一个session
    def __init__(self):
        self.session = requests.session()

    def get(self, url, **kwargs):
        try:
            r = self.session.get(url, **kwargs)
            # print(f"发送get请求，url:{url},请求参数{kwargs}")
            return r
        except Exception as e:
            print(e)

    def post(self, url, **kwargs):
        try:
            r = self.session.post(url, **kwargs)
            # print(f"发送get请求，url:{url},请求参数{kwargs}")
            return r
        except Exception as e:
            print(e)


if __name__ == '__main__':
    re = BaseRequests()
    r = re.get("http://192.168.1.64:8089/futureloan/mvc/api/member/list")
    print(r.text)
    r = re.post("http://192.168.1.64:8089/futureloan/mvc/api/member/login", data={"mobilephone": "", "pwd": "111"})
    print(r.text)
