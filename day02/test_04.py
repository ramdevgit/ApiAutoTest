'''
fixture 级别：
    function(默认)
    module
    class
    session
'''
import pytest


@pytest.fixture(scope='module')
def db():
    print("前置db")
    yield
    print("后置db")


@pytest.fixture(scope='module')
def login():
    print("前置，")
    yield
    print("后置")


def test_01():
    print("用例1")


def test_02(login,db):
    print("用例2")


def test_03():
    print("用例3")
