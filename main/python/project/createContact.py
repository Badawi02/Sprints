import re
import datetime
from datetime import datetime

def createContact() :
    print("#### Hello let's create your Contacts ####")
    while True:
        con = input("Are you sure want to continue y/n ?  ")
        if con == "n" :
            print("back to main menu")
            break

        elif con == "y" :
            while True :
                fname = input("Enter first name : ")
                if fname.isalpha() :
                    break
                print("plz enter valid name , must be string")

            while True :
                lname = input("Enter last name :")
                if lname.isalpha() :
                    break
                print("plz enter valid name , must be string")

            while True :
                email = input("Enter the email : ")
                regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  
                if re.search(regex,email) :
                    break
                print("plz enter valid eamil")

            while True :
                phone = input("enter egyptain phone number : ")
                nphone = list(phone)
                if phone.isdigit() and len(nphone) == 11 :
                    if nphone[0:3]==['0','1','1'] or nphone[0:3]==['0','1','0'] or nphone[0:3]==['0','1','2'] or nphone[0:3]==['0','1','5']:
                        break
                print("plz enter valid egyptain phone number , must be equal 11 numbers")

            address = input("Enter the address : ")

            # datetime object containing current date and time
            now = datetime.now()

            # dd/mm/YY_H:M:S
            now_string = now.strftime("%H-%M-%S")
            dt_string = now.strftime("%d-%m-%Y")

            try:
                operation = open(f"contactbook_{dt_string}.csv", "a")
            except Exception as err:
                print(err)
            else:
                userinfo = f"{fname}:{lname}:{email}:{phone}:{address}:{now_string}:{dt_string}\n"
                operation.write(userinfo)
                print ("====================  New Contact Created Successfully ====================")
                operation.close()

            try:
                operation = open("all_Contacts.csv", "a")
            except Exception as err:
                print(err)
            else:
                userinfo = f"{fname}:{lname}:{email}:{phone}:{address}:{now_string}:{dt_string}\n"
                operation.write(userinfo)
                operation.close()
            
            break

        else:
            continue
