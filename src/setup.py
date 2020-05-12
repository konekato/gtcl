import json
import config

def setup():
    urlsdict = config.urlsdict
    for dow in config.DOW_LIST:
        for i in range(5):
            if (i+1) % 2 == 0:
                urlsdict[dow][str(i+1)] = 'even'
            else:
                urlsdict[dow][str(i+1)] = 'odd'

if __name__ == '__main__':
    setup()