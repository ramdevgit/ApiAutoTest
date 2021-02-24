'''
有多个fixture 带参数
一个字符串搜索的参数，三个输入
    要搜索的字符串:大写 小写 大小写混合
    搜索的设置 是否区分大小写
    搜索的设置：向上 向下
'''
import pytest


# 要搜索的字符串
@pytest.fixture(params=["hello", "HELLO", "Hello"])
def zfc(request):
    return request.param


# 搜索方向
@pytest.fixture(params=["向上", "向下"])
def fx(request):
    return request.param


# 是否区分大小写
@pytest.fixture(params=["是", "否"])
def dx(request):
    return request.param


def test_search(zfc, fx, dx):
    print(f"测试字符串搜索功能，搜索的字符串为{zfc}搜索方向{fx}是否区分大小写{dx}")
