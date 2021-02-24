'''
session 级别的前置和后置 放到conftest.py
不需要import pytest根据文件名找到对应的方法
脚本层的一些公共的方法可以放到这里

一个工程可以包含多个conftest.py 对同级下的目录及子目录你生效
'''
import pytest


@pytest.fixture(scope='session')
def db():
    print("前置db")
    yield
    print("后置db")


@pytest.fixture(scope='session')
def login():
    print("前置，")
    yield
    print("后置")
