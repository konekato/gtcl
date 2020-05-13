import datetime
import locale
import config

# 今日の曜日を取得


def dow_today():
    locale.setlocale(locale.LC_TIME, 'ja_JP.UTF-8')

    return datetime.datetime.now().strftime('%a')

# 今の時限を取得


def period_now():
    cnt = 0

    for i in range(6):
        if datetime.datetime.now().time() >= datetime.datetime.strptime(config.CLASS_TIME_LIST[i], '%H:%M').time():
            cnt += 1

    if cnt > 0 and cnt < 6:
        return str(cnt)
    else:
        return None
