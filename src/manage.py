import sys
import subprocess
import json
import validate
import input
import setting

def main():
    print('いつが良い？')
    print('曜日を選択してください。（ 火 のように入力してね。）')
    dow = input.dow_input()
    print('時限を選択してください。（ 3 のように入力してね。）')
    period = input.period_input()

    try:
        urlsdict = json.load(open('src/data/urls.json', 'r'))
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

    command = ['open', url]
    try:
        subprocess.check_output(command)
    except:
        print('そのようなコマンドは見つかりません。\n')
        return

if __name__ == '__main__':
    args = sys.argv

    if len(args) == 2:
        if(args[1] == 'run'):
            main()
        elif(args[1] == 'setup'):
            setting.setup()
        elif(args[1] == 'update'):
            setting.update()
        else:
            print('`$ python(3) manage.py <引数>` にて実行できます。\n引数は以下の通りです。\nrun: 実行\nsetup: 初期セットアップ\nupdate: 設定変更')
    else:
        print('`$ python(3) manage.py <引数>` にて実行できます。\n引数は以下の通りです。\nrun: 実行\nsetup: 初期セットアップ\nupdate: 設定変更')