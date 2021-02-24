'''
注册用例测试
'''
import requests as re
import pytest

register_url = "http://jy001:8081/futureloan/mvc/api/member/register"


def test_register_001():
    params = {
        "mobilephone": "",
        "pwd": "",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20103'
    assert r.json()['msg'] == '手机号不能为空'


def test_register_002():
    params = {
        "mobilephone": "1999",
        "pwd": "",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20103'
    assert r.json()['msg'] == '密码不能为空'


def test_register_003():
    params = {
        "mobilephone": "",
        "pwd": "12122",
        "regname": "aaaa"
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20103'
    assert r.json()['msg'] == '手机号不能为空'


def test_register_004():
    params = {
        "mobilephone": "",
        "pwd": "",
        "regname": "aaaa"
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20103'
    assert r.json()['msg'] == '手机号不能为空'


def test_register_005():
    params = {
        "mobilephone": "1998822",
        "pwd": "123",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20108'
    assert r.json()['msg'] == '密码长度必须为6~18'


def test_register_006():
    params = {
        "mobilephone": "1998822",
        "pwd": "123",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20108'
    assert r.json()['msg'] == '密码长度必须为6~18'


def test_register_007():
    params = {
        "mobilephone": "1998822",
        "pwd": "1231111111111111111",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20108'
    assert r.json()['msg'] == '密码长度必须为6~18'


def test_register_008():
    params = {
        "mobilephone": "1998822",
        "pwd": "123456",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20109'
    assert r.json()['msg'] == '手机号码格式不正确'


def test_register_009():
    params = {
        "mobilephone": "1998822",
        "pwd": "123111111111111111",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20109'
    assert r.json()['msg'] == '手机号码格式不正确'


def test_register_010():
    params = {
        "mobilephone": "1998822",
        "pwd": "1111111111",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20109'
    assert r.json()['msg'] == '手机号码格式不正确'


def test_register_011():
    params = {
        "mobilephone": "1998822",
        "pwd": "123111111111111111",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20109'
    assert r.json()['msg'] == '手机号码格式不正确'


def test_register_012():
    params = {
        "mobilephone": "18792533140",
        "pwd": "123",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20108'
    assert r.json()['msg'] == '密码长度必须为6~18'


def test_register_013():
    params = {
        "mobilephone": "18792533140",
        "pwd": "1231111111111111111",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20108'
    assert r.json()['msg'] == '密码长度必须为6~18'


def test_register_014():
    params = {
        "mobilephone": "18792533140",
        "pwd": "123456",
        "regname": ""
    }
    r = re.get(register_url, params=params)
    assert r.json()['code'] == '20110'
    assert r.json()['msg'] == '手机号码已被注册'
