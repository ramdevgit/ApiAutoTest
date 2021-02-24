'''
fixture带参数
'''
import pytest


@pytest.fixture(params=[{"username": "root", "pwd": 123456}, {"username": "admin", "pwd": 123456}])
def login_data(request):  # request是pytest的关键字
    return request.param  # 固定写法


def test_login(login_data):
    print(f"测试登录功能，用户名:{login_data['username']}密码：{login_data['pwd']}登录")
