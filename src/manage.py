import sys
import script
import config

def main():
    args = sys.argv

    if len(args) == 2:
        if(args[1] == 'gtzm'):
            script.gtzm()
        elif(args[1] == 'go'):
            script.go()
        elif(args[1] == 'setup'):
            script.setup()
        elif(args[1] == 'update'):
            script.update()
        elif(args[1] == 'confirm'):
            script.confirm()
        else:
            print(config.COMMANDLINE_MESSAGE_TEMPLATE)
    else:
        print(config.COMMANDLINE_MESSAGE_TEMPLATE)
    

if __name__ == '__main__':
    main()