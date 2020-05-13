DOW_LIST = ['月', '火', '水', '木', '金', '土']
URL_PREFIX_LIST = [
    'https://dendai.zoom.us/',
    'https://tdu.box.com/',
    'https://els.sa.dendai.ac.jp/webclass/'
    ]

def PRINT_UPL():
    for prefix in URL_PREFIX_LIST:
        print('・' + prefix)

urlsdict = {
    '月': {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        },
    '火': {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        },
    '水': {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        },
    '木': {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        },
    '金': {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        },
    '土': {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        }
    }

COMMANDLINE_MESSAGE_TEMPLATE = (' $ python(3) manage.py <引数> にて実行できます。\n'
                                '\n'
                                '引数は以下の通りです。\n'
                                '\n'
                                ' setup      初期セットアップ\n'
                                '\n'
                                ' go         実行\n'
                                ' confirm    設定確認\n'
                                ' update     設定変更\n')