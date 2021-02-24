'''
pytest 命名：
    1、文件用test_开头
    2、类用Test开头
    3、函数或者方法用test_开头
'''

login_url = "http://jy001:8081/futureloan/mvc/api/member/login"
register_url = "http://jy001:8081/futureloan/mvc/api/member/register"

def test_register_001():
    print("ssss")


def test_register_002():
    print("手机号格式错误的脚本")


def test_register_003():
    print("密码格式错误的脚步")
