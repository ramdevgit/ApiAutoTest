import pytest

from apiautotest.zonghe.baw import Member
from apiautotest.zonghe.caw import DataRead, Check, MysqlOp


@pytest.fixture(params=DataRead.read_yaml(r"test_data/recharge.yaml"))
def recharge_data(request):
    return request.param

def test_recharge(baserequest,url,recharge_data,db_info):
    # 注册
    Member.register(baserequest,url,recharge_data['regdata'])
    # 登录
    Member.login(baserequest,url,recharge_data['logindata'])
    # 充值
    r = Member.recharge(baserequest,url,recharge_data['recdata'])
    # 检查
    Check.equal(r.json(),recharge_data['expect'],'code,status,msg')
    # 删除
    MysqlOp.delete_user(db_info,recharge_data['regdata']['mobilephone'])

