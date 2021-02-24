import pytest

from apiautotest.zonghe.baw import Member
from apiautotest.zonghe.caw import DataRead, MysqlOp


# 前置条件，注册的数据

@pytest.fixture(params=DataRead.read_yaml(r"test_data/login_setup.yaml"))
def setup_data(request):
    return request.param


# 登录的测试数据
@pytest.fixture(params=DataRead.read_yaml(r"test_data/login_data.yaml"))
def login_data(request):
    return request.param


@pytest.fixture()
def register(setup_data, baserequest, url, db_info):
    # 注册用户
    MysqlOp.delete_user(db_info, setup_data['data']['mobilephone'])
    r = Member.register(baserequest, url, setup_data['data'])
    yield
    # 删除用户
    MysqlOp.delete_user(db_info, setup_data['data']['mobilephone'])


def test_login(register, login_data, baserequest, url):
    # 下发登录请求
    r = Member.login(baserequest, url, login_data['data'])
    # 检查结果
    print(r.json()['status'])
    print(r.json()['code'])
    print(r.json()['msg'])
    rs = Member.list(baserequest, url)
    assert r.json()['code'] == login_data['expect']['code']
