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

def url_validation(validated):
    if not validated:
        print('URLが登録されていません。')
        return False
    elif not validated.startswith(config.URL_PREFIX):
        print(config.URL_PREFIX + ' で始まるURLを登録してください。')
        return False
    
    return True