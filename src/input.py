import validate

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