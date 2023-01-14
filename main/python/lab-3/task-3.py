
def checkbalance (my_string):
    brackets = ['()', '{}', '[]']
    while any (x in my_string for x in brackets):
        for br in brackets:
            my_string = my_string.replace(br, '')
    if my_string in brackets or my_string == '':
        print ('yes')
    else:
        print ('no')

checkbalance('[{(}]')
