import config


def is_dow(validated):
    for dow in config.DOW_LIST:
        if validated == dow:
            return True

    return False


def is_period(validated):
    for i in range(5):
        if validated == str(i+1):
            return True

    return False


def is_url(validated):
    for prefix in config.URL_PREFIX_LIST:
        if validated.startswith(prefix):
            return True

    return False


def url_validation(validated):
    if not validated:
        print('URLが登録されていません。')
        return False
    elif not is_url(validated):
        print('-------------\n'
              'Error.\n'
              'URLが正しくありません。\n'
              'Hint:')
        config.PRINT_UPL()
        print('-------------')
        return False

    return True
