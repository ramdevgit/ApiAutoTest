'''
操作Mysql数据库的方法
'''
import pymysql
import json

from apiautotest.zonghe.caw import DataRead


def connect(db_info):
    """

    :param db_info:
    :return:
    """
    host = db_info['host']
    port = db_info['port']
    user = db_info['user']
    pwd = db_info['pwd']
    database = db_info['name']
    try:
        conn = pymysql.connect(host=host, user=user, password=pwd,
                               database=database, port=port, charset='utf8')
        # print("连接成功")
        return conn
    except Exception as e:
        print(f"数据库连接失败{e}")


def disconnect(conn):
    try:
        conn.close()
    except Exception as e:
        print(f"断开数据库失败{e}")


def execute(conn, sql):
    try:
        cursor = conn.cursor()  # 获取游标
        # 执行sql语句
        cursor.execute(sql)
        # 提交
        conn.commit()
        data = cursor.fetchall()
        # 关闭游标
        cursor.close()
        return data
    except Exception as e:
        print(f"sql执行失败{e}")
    pass


def delete_user(db_info, mobilephone):
    """
    根据手机号删除用户
    :param db_info:
    :param mobilephone:
    :return:
    """
    conn = connect(db_info)
    sql = f"delete from member where mobilephone={mobilephone};"
    execute(conn, sql)
    disconnect(conn)


if __name__ == '__main__':
    db_info = DataRead.read_ini('test_env/env.ini', 'db_info')
    info = json.loads(db_info)
    conn = connect(info)
    data = execute(conn, "select * from member")
    # print(data)
    disconnect(conn)
