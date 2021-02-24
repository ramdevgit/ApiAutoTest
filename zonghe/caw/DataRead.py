import configparser
import os
import yaml


def get_project_path():
    """

    :return: E:\python\workspace\apiautotest\zonghe\
    """
    # 当前文件路径
    file_path = os.path.realpath(__file__)
    # print(file_path)
    # 当前文件所在目录
    dir_path = os.path.dirname(file_path)
    # 上级目录
    dir_path = os.path.dirname(dir_path)
    # print("在上级目录", dir_path)
    return dir_path + "\\"


def read_ini(file_path, key):
    """

    :param file_path:文件路径
    :param key:变量名
    :return:返回值
    """
    config = configparser.ConfigParser()
    file_path = get_project_path() + file_path
    config.read(file_path)
    value = config.get("env", key)
    return value


def read_yaml(file_path):
    """

    :param file_path:文件路径
    :return:文件内容
    """
    file_path = get_project_path() + file_path
    with open(file_path, 'r', encoding='utf-8') as f:
        file_content = f.read()
        content = yaml.load(file_content, Loader=yaml.FullLoader)
        return content


if __name__ == '__main__':
    # v = read_ini(r"test_env\env.ini", "url")
    # print(v)
    data = read_yaml(r"test_data/register_fail.yaml")
    url = read_ini(r"test_env\env.ini",'url')
    print(url)
    # print(data[0]['data'])
    # print(data[0]['except'])