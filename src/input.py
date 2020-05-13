import validate
import config


def dow_input():
    while True:
        dow = input()
        if validate.is_dow(dow):
            return dow
        else:
            print('月〜土で、 火 のように入力してね。')


def period_input():
    while True:
        period = input()
        if validate.is_period(period):
            return period
        else:
            print('1〜5で、 2 のように入力してね。')


def url_input():
    while True:
        url = input()
        if not url:
            return
        elif validate.is_url(url):
            return url
        else:
            config.PRINT_UPL()
            print('で始まるようなURLを登録してください。')
            print('enterキーでスキップできます。')
