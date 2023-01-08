while True :
    mystring = input("Enter your string : ")
    if mystring.isalpha() :
        break
    else :
        print("please enter string only")
        continue

while True :
    postion = input("Enter your postion : ")
    if postion.isdigit() :
        mypostion = int(postion)
        break
    else :
        print("please enter int only")
        continue

while True :
    mychar = input("Enter your char : ")
    if mychar.isalpha() :
        break
    else :
        print("please enter string only")
        continue

def my_fun(str_input,postion_input,char_input) :
    list_string = list(str_input)
    list_string[postion_input] = char_input
    new_string = "".join(list_string)
    return print(f"Your new string is : {new_string}")

my_fun(mystring,mypostion,mychar)