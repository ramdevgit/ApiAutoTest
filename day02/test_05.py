'''

'''
import pytest


@pytest.fixture(scope='class')
def db():
    print("前置db")
    yield
    print("后置db")


@pytest.fixture(scope='class')
def login():
    print("前置，")
    yield
    print("后置")


class TestRegister:

    def test_01(self):
        print("登录用例1")

    def test_02(self,db):
        print("登录用例2")

    def test_03(self):
        print("登录用例3")


class TestLogin:

    def test_01(self,login):
        print("注册用例1")

    def test_02(self):
        print("注册用例2")

    def test_03(self):
        print("注册用例3")
