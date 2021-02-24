'''
登录用例测试
'''
import requests as re
import pytest


class TestLogin:
    login_url = "http://jy001:8081/futureloan/mvc/api/member/login"

    @pytest.fixture(scope='class',
                    params=[
                        {'data': {"username": '', 'pwd': ''},
                         'expect': {'code': '20103', 'msg': '手机号不能为空'}
                         },
                        {'data': {"username": '123344', 'pwd': ''},
                         'expect': {'code': '20103', 'msg': '密码不能为空'}
                         },
                        {'data': {"username": '22222222', 'pwd': '1111111'},
                         'expect': {'code': '20111', 'msg': '用户名或密码错误'}
                         },
                        {'data': {"username": '18792533140', 'pwd': '122222'},
                         'expect': {'code': '10001', 'msg': '登录成功'}
                         }
                    ])
    def get_data(self, request):
        return request.param

    def test_login(self, get_data):
        params = {
            "mobilephone": get_data['data']['username'],
            "pwd": get_data['data']['pwd'],
        }

        r = re.get(self.login_url, params=params)
        assert r.json()['code'] == get_data['expect']['code']
        assert r.json()['msg'] == get_data['expect']['msg']

    # def test_login_001(self):
    #     params = {
    #         "mobilephone": "",
    #         "pwd": "",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     print(r.json())
    #     assert r.json()['code'] == '20103'
    #     assert r.json()['msg'] == '手机号不能为空'
    #
    # def test_login_002(self):
    #     params = {
    #         "mobilephone": "1998",
    #         "pwd": "",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     assert r.json()['code'] == '20103'
    #     assert r.json()['msg'] == '密码不能为空'
    #
    # def test_login_003(self):
    #     params = {
    #         "mobilephone": "1998",
    #         "pwd": "1111",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     assert r.json()['code'] == '20111'
    #     assert r.json()['msg'] == '用户名或密码错误'
    #
    # def test_login_004(self):
    #     params = {
    #         "mobilephone": "18792533140",
    #         "pwd": "1111",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     assert r.json()['code'] == '20111'
    #     assert r.json()['msg'] == '用户名或密码错误'
    #
    # def test_login_005(self):
    #     params = {
    #         "mobilephone": "1998",
    #         "pwd": "123456",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     assert r.json()['code'] == '20111'
    #     assert r.json()['msg'] == '用户名或密码错误'
    #
    # def test_login_006(self):
    #     params = {
    #         "mobilephone": "18792533140",
    #         "pwd": "111111111111111111111111111111",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     assert r.json()['code'] == '20111'
    #     assert r.json()['msg'] == '用户名或密码错误'
    #
    # def test_login_007(self):
    #     params = {
    #         "mobilephone": "18792533140",
    #         "pwd": "122222",
    #     }
    #     r = re.get(self.login_url, params=params)
    #     assert r.json()['code'] == '10001'
    #     assert r.json()['msg'] == '登录成功'
