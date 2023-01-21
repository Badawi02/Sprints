
def viewContact() :
    while True:
        con = input("Are you sure want to continue y/n ?  ")
        if con == "n" :
            print("back to main menu")
            break
        elif con == "y" :
            while True :
                choose = input("You want all Contacts or one day (all - one) : ")
                if choose == 'one' :
                    date_want = input("plz enter data you want opne it at format (dd-mm-yy): ")
                    try:
                        operation = open(f"contactbook_{date_want}.csv", "r")
                    except Exception as err:
                        print("the date you want not found")
                        continue
                    else:
                        data = operation.read()
                        print("====================== Your Contacts =============================")
                        print("Fname:Lname:Email:Phone:Address:Time:Date")
                        print(data)
                        operation.close()
                    break
                elif choose == 'all' :
                    try:
                        operation = open(f"all_Contacts.csv", "r")
                    except Exception as err:
                        print(err)
                    else:
                        data = operation.read()
                        print("====================== Your Contacts =============================")
                        print("Fname:Lname:Email:Phone:Address:Time:Date")
                        print(data)
                        operation.close()
                    break
                else:
                    continue
            break
