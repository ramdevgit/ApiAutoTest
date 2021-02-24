'''
更加灵活的前置和后置：fixture
    不适用 setup teardown
    使用起来灵活

'''
import pytest


# 测试前置
@pytest.fixture(scope='function')# scope默认是function级别的（module）
def login():
    print("登录")
    yield  # yield 之前是前置 之后是后置
    print("退出")
    print("测试结束")


def test_query():
    print("查询，不需要登录")


def test_add(login):
    print("添加功能，需要登录")


@pytest.mark.usefixtures('login')
def test_delete():
    print("删除功能,需要登录")


def test_register():
    print("注册功能，不需要登录")
