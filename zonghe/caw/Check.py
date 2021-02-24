import pytest_check as check

def equal(real,expect,keys):
    '''

    简化为：Check.equal(r.json(),data['expect'],'code,status,msg')
    检查两个字典中的value是否一致
    不推荐直接判等
    1、结果中有一些不关键的信息，后面有变化时。会导致脚本不能通过
    2、时间戳
    3、结果可能很长
    :param real:实际结果
    :param expect:期望结果
    :param keys:对比的关键字
    :return:
    '''
    ks = keys.split(",")
    for k in ks:
        # 取实际结果的value
        r = str(real.get(k))
        # 取期望的value
        e = str(expect.get(k))
        try:
            check.equal(r,e)
            print(f"检验{k}成功")
        except:
            print(f"检验{k}失败")