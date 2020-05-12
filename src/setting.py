from collections import OrderedDict
import json
import config
import input

def setup():
    print('各授業のZOOMのURLを入力してください。（returnキーで飛ばす。）')
    urlsdict = config.urlsdict
    for dow in config.DOW_LIST:
        print(dow + "曜日")
        for i in range(5):
            print(str(i+1) + '限目: ')
            urlsdict[dow][str(i+1)] = input.url_input()

    try:
        with open('src/data/urls.json', 'w') as f:
            json.dump(urlsdict, f, indent=2, ensure_ascii=False)
    except FileNotFoundError:
        print('-------------\nError.\nsrc/data ディレクトリが見つかりません。\nHint: $ mkdir src/data\n-------------')
        return

def update():
    print('設定内容を編集します。')
    print('いつが良い？')
    print('曜日を選択してください。（ 火 のように入力してね。）')
    dow = input.dow_input()
    print('時限を選択してください。（ 3 のように入力してね。）')
    period = input.period_input()
    print('更新する授業のZOOMのURLを入力してください。')
    url = input.url_input()

    try:
        with open('src/data/urls.json') as f:
            urlsdict = json.load(f, object_pairs_hook=OrderedDict)
    except FileNotFoundError:
        print('src/data/urls.json が見当たりません。\nHint: setup()\n')
        return
    
    urlsdict[dow][period] = url

    with open('src/data/urls.json', 'w') as f:
        json.dump(urlsdict, f, indent=2, ensure_ascii=False)