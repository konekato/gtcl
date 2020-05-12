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
    if not validated.startswith(config.URL_PREFIX):
        print(config.URL_PREFIX + ' で始まるURLを登録してください。')
        return False
    
    return True

def url_validation(validated):
    if not validated:
        print('URLが登録されていません。')
        return False
    elif not is_url(validated):
        return False
    
    return True