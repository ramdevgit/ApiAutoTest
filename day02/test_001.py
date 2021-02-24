'''
前置和后置
    模块级和函数级
'''

def setup_module():
    print("前置，模块用例执行前的操作")

def teardown_module():
    print("后置，模块用例执行完的操作")

def setup_function():
    print("前置，每个用例执行前的操作")

def teardown_function():
    print("后置，每个用例执行完的操作")

def test_01():
    print("用例1")

def test_02():
    print("用例2")

def test_03():
    print("用例3")
