import pytest

from apiautotest.zonghe.baw import Member
from apiautotest.zonghe.caw import DataRead, MysqlOp


@pytest.fixture(params=DataRead.read_yaml(r"test_data\register_fail.yaml"))
def fail_data(request):
    return request.param


def test_register_fail(fail_data, baserequest, url):
    """
    注册失败的脚本
    :return:
    """
    # 下发请求
    r = Member.register(baserequest, url, fail_data['data'])
    # 检查结果与预期结果一致
    # print(r.text)
    assert r.json()['code'] == fail_data['expect']['code']
    print(r.json()['code'])
    print(r.json()['msg'])


@pytest.fixture(params=DataRead.read_yaml(r"test_data/register_pass.yaml"))
def pass_data(request):
    return request.param


def test_register_pass(pass_data, baserequest, url, db_info):
    """

    :param pass_data:测试数据
    :param baserequest:baserequest实例
    :param url:地址
    :param db_info:数据库信息
    :return:
    """
    MysqlOp.delete_user(db_info, pass_data['data']['mobilephone'])
    # 发请求
    # print(rs.text)
    r = Member.register(baserequest, url, pass_data['data'])
    # print(r.text)
    print(r.json()['status'])
    print(r.json()['code'])
    print(r.json()['msg'])
    rs = Member.list(baserequest, url)
    assert r.json()['code'] == pass_data['expect']['code']
    assert pass_data['data']['mobilephone'] in rs.text
    MysqlOp.delete_user(db_info, pass_data['data']['mobilephone'])
    # 原则1：测试环境，在执行脚本前是什么状态，执行完要恢复成什么状态
    # 原则2：脚本执行依赖的环境，要在脚本中自己构造
    #     例如：审核项目接口测试时依赖已有的项目，需要调用添加项目的接口准备测试环境
    # 脚本的健壮性、稳定性比较高
    #
    # 重复注册测试逻辑
    # 环境准备：下发注册请求
    # 测试步骤：下发注册请求，检查结果，报错重复注册
    # 恢复环境，删除用户