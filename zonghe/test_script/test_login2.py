import pytest

from apiautotest.zonghe.baw import Member
from apiautotest.zonghe.caw import DataRead, MysqlOp, Check


@pytest.fixture(params=DataRead.read_yaml(r"test_data/login.yaml"))
def login_data(request):
    return request.param


def test_login(baserequest, url, login_data, db_info):
    # 注册用户
    Member.register(baserequest, url, login_data['regdata'])
    # 登录
    r = Member.login(baserequest, url, login_data['logindata'])
    # 检查
    Check.equal(r.json(),login_data['expect'],'code,status,msg')
    # 删除
    MysqlOp.delete_user(db_info, login_data['regdata']['mobilephone'])
