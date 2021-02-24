'''
自定义标记
    跳过用例：这个版本有缺陷 导致用例执行失败，缺陷修改周期比较长
            为了不影响通过率 可以将失败的用例跳过 待缺陷解决后 再执行
            某个功能在最新的版本上实现的 之前的版本不执行
    执行某一部分用例:界面、接口、功能、冒烟、脚本规模逐步增大 只想执行冒烟测试的脚本
            只执行接口的用例，怎么办？自定义标记
            smoke:冒烟
            func:功能
            api:接口
'''

import pytest

version = '1.1'


@pytest.mark.smoke
def test_001():
    print("用例1")


@pytest.mark.skip("跳过的原因:近期不解决导致的缺陷")
def test_002():
    print("用例2")


@pytest.mark.skipif(version == '1.1', reason="版本不支持")
def test_003():
    print("用例3")

@pytest.mark.func
class TestMark:

    def test_004(self):
        print("用例4")
    @pytest.mark.smoke
    def test_005(self):
        print("用例5")

    def test_006(self):
        print("用例6")

    def test_007(self):
        print("用例7")
