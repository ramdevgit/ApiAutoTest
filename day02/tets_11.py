'''
Mock 1:接口测试时，场景不好构造出来 用Mock模拟某个接口的返回值
    2:依赖其他项目的接口 但是该接口尚未开发完成 自己所在的项目的接口已开发完成，没有依赖接口的环境，如何测试

'''
import requests
from unittest import mock


# 接口地址：http://www/zhifu.com/pay
# 方法：post
# 参数：{"订单号":11111111,"支付金额":100,"支付方式":1}
# 返回值：{"code":10001,"msg":"支付成功"}
# 返回值：{"code":10002,"msg":"支付失败"}
def zhifu(data):
    r = requests.post("http://www/zhifu.com/pay", data)
    return r.json()


def test_zhifu():
    data = {"订单号": 1111111, "支付金额": 100, "支付方式": 1}
    zhifu = mock.Mock(return_value={"code": 10001, 'msg': "支付成功"})
    r = zhifu(data)
    assert r['msg'] == "支付成功"
