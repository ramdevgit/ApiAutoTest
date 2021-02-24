'''
前置和后置
    类和方法级
'''

class TestClass:

    def setup_class(self):
        print("类用例执行前的操作")

    def teardown_class(self):
        print("类用例执行完的操作")

    def setup_method(self):
        print("类方法执行前的操作")

    def teardown_method(self):
        print("方法执行完的操作")

    def test_01(self):
        print("用例1")

    def test_02(self):
        print("用例2")

    def test_03(self):
        print("用例3")
