'''
fixture 嵌套
'''
import pytest
import random


# 生成用户名
@pytest.fixture()
def get_username():
    return "admin" + str(random.randint(1, 10000))


# 生成密码
@pytest.fixture()
def get_pwd():
    return random.randint(100000, 9999999999)


@pytest.fixture()
def get_login_data(get_username, get_pwd):
    return {"username": get_username, "pwd": get_pwd}


def test_login(get_login_data):
    print(f"测试登录，登录数据为:{get_login_data}")
