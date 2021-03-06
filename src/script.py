from collections import OrderedDict
from tabulate import tabulate
import os
import webbrowser
import json
import config
import input
import validate
import date

directory = os.path.dirname(__file__)
json_file_path = os.path.join(directory, 'data', 'urls.json')


def gtcl():
    dow = date.dow_today()
    period = date.period_now()
    if period is None:
        print('授業時間外です。')
        return

    try:
        urlsdict = json.load(open(json_file_path, 'r'))
    except FileNotFoundError:
        print('src/data/urls.json が見当たりません。\nHint: setup()\n')
        return

    try:
        url = urlsdict[dow][period]
    except KeyError:
        print('dict から key が見つかりません。\n')
        return
    if not validate.url_validation(url):
        return

    try:
        webbrowser.open(url, 2)
    except:
        print('ブラウザエラー\n')
        return


def go():
    print('いつが良い？')
    print('曜日を選択してください。（ 火 のように入力してください。）')
    dow = input.dow_input()
    print('時限を選択してください。（ 3 のように入力してください。）')
    period = input.period_input()

    try:
        urlsdict = json.load(open(json_file_path, 'r'))
    except FileNotFoundError:
        print('src/data/urls.json が見当たりません。\nHint: setup()\n')
        return

    try:
        url = urlsdict[dow][period]
    except KeyError:
        print('dict から key が見つかりません。\n')
        return
    if not validate.url_validation(url):
        return

    try:
        webbrowser.open(url, 2)
    except:
        print('ブラウザエラー\n')
        return


def setup():
    print('各授業のURLを入力してください。（returnキーでスキップ。）')
    urlsdict = config.EMPTY_URLS_DICT
    for dow in config.DOW_LIST:
        print(dow + "曜日")
        for i in range(config.PERIOD_NUMBER):
            print(str(i+1) + '限目: ')
            urlsdict[dow][str(i+1)] = input.url_input()

    try:
        with open(json_file_path, 'w') as f:
            json.dump(urlsdict, f, indent=2, ensure_ascii=False)
    except FileNotFoundError:
        print('-------------\nError.\nsrc/data ディレクトリが見つかりません。\nHint: $ mkdir src/data\n-------------')
        return


def update():
    print('設定内容を編集します。')
    print('何曜日の何限のURLを変更しますか？')
    print('曜日を選択してください。（ 火 のように入力してください。）')
    dow = input.dow_input()
    print('時限を選択してください。（ 3 のように入力してください。）')
    period = input.period_input()
    print('更新する授業のURLを入力してください。')
    url = input.url_input()

    try:
        with open(json_file_path) as f:
            urlsdict = json.load(f, object_pairs_hook=OrderedDict)
    except FileNotFoundError:
        print('src/data/urls.json が見当たりません。\nHint: setup()\n')
        return

    urlsdict[dow][period] = url

    with open(json_file_path, 'w') as f:
        json.dump(urlsdict, f, indent=2, ensure_ascii=False)

# 設定を表で確認できる関数


def confirm():
    # header
    headers = config.DOW_LIST
    headers.insert(0, '')

    # table
    table = []
    try:
        urlsdict = json.load(open(json_file_path, 'r'))
    except FileNotFoundError:
        print('src/data/urls.json が見当たりません。\nHint: setup()\n')
        return

    for i in range(config.PERIOD_NUMBER):
        tmp = [str(i+1)]
        for dow in config.EMPTY_URLS_DICT:
            try:
                url = urlsdict[dow][str(i+1)]
                if url is not None:
                    element = url[8:28]
                    element += '...'
                else:
                    element = url
            except KeyError:
                print('dict から key が見つかりません。\n')
                return
            tmp.append(element)
        table.append(tmp)

    print('\nhttps:// は省略')
    result = tabulate(table, headers, tablefmt="grid")
    print(result)
