import subprocess
import json
import validate
import input

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
    main()