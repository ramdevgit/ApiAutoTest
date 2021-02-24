'''
脚本层的公共前置，后置，整个执行过程执行一次
不用import
'''

import pytest
import json
from apiautotest.zonghe.caw import DataRead
from apiautotest.zonghe.caw.BaseRequests import BaseRequests


@pytest.fixture(scope='session')
def url():
    return DataRead.read_ini(r"test_env\env.ini", 'url')


@pytest.fixture(scope='session')
def db_info():
    return json.loads(DataRead.read_ini('test_env/env.ini', 'db_info'))


@pytest.fixture(scope='session')
def baserequest():
    return BaseRequests()
