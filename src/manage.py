import subprocess
import json

def main():
    print('いつが良い？')
    print('曜日を選択してください。（ 火 のように入力してね。）')
    dow = input()
    print('時限を選択してください。（ 3 のように入力してね。）')
    period = input()

    urlsdict = json.load(open('src/data/urls.json', 'r'))

    url = urlsdict[dow][period]
    args = ['open', url]
    try:
        subprocess.check_output(args)
    except:
        print('Error.')

if __name__ == '__main__':
    main()