import subprocess

def main():
    url='https://google.com'
    args = ['open', url]
    try:
        res = subprocess.check_output(args)
    except:
        print('Error.')

if __name__ == '__main__':
    main()