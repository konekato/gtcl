import json
import config

def setup():
    urlsdict = config.urlsdict
    for dow in config.DOW_LIST:
        print(dow + "曜日")
        for i in range(5):
            print(str(i+1) + '限目: ')
            urlsdict[dow][str(i+1)] = input()

    with open('src/data/urls.json', 'w') as f:
        json.dump(urlsdict, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    setup()