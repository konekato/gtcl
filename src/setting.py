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
    

setup()