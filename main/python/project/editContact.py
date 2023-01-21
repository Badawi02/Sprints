from deleteContact import displayAllContacts
import datetime
import re


def editContact():
    allcontacts = displayAllContacts()  
    Contactedit = input("please enter the Fname of the contact you want to edit : ")
    for l in allcontacts:
        con_info = l.strip("\n")
        con_info = con_info.split(":")
        print(con_info)
        if con_info[0] == Contactedit:
            print("Contactfound")

            part_to_edit = input("please choose:\nf) for edit Fname \nl) for edit Lname  \ne) for edit Email  \np) for edit Phone \nd) for edit Addreess  \na) for edit All ")
            if part_to_edit == "f":
                while True :
                    fname = input("Enter first name : ")
                    if fname.isalpha() :
                        con_info[0] = fname
                        break
                    print("plz enter valid name , must be string")
            elif part_to_edit == "l":
                while True :
                    lname = input("Enter last name :")
                    if lname.isalpha() :
                        con_info[1] = lname
                        break
                    print("plz enter valid name , must be string")
            elif part_to_edit == "e":
                while True :
                    email = input("Enter the email : ")
                    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  
                    if re.search(regex,email) :
                        con_info[2] = email
                        break
                    print("plz enter valid eamil")
            
            elif part_to_edit == "p":
                while True :
                    phone = input("enter egyptain phone number : ")
                    nphone = list(phone)
                    if phone.isdigit() and len(nphone) == 11 :
                        if nphone[0:3]==['0','1','1'] or nphone[0:3]==['0','1','0'] or nphone[0:3]==['0','1','2'] or nphone[0:3]==['0','1','5']:
                            con_info[3] = phone
                            break
                    print("plz enter valid egyptain phone number , must be equal 11 numbers")

            elif part_to_edit == "d":
                address = input("Enter the address : ")
                con_info[4] = address

            elif part_to_edit == "a":
                while True :
                    fname = input("Enter first name : ")
                    if fname.isalpha() :
                        con_info[0] = fname
                        break
                    print("plz enter valid name , must be string")

                while True :
                    lname = input("Enter last name :")
                    if lname.isalpha() :
                        con_info[1] = lname
                        break
                    print("plz enter valid name , must be string")

                while True :
                    email = input("Enter the email : ")
                    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  
                    if re.search(regex,email) :
                        con_info[2] = email
                        break
                    print("plz enter valid eamil")

                while True :
                    phone = input("enter egyptain phone number : ")
                    nphone = list(phone)
                    if phone.isdigit() and len(nphone) == 11 :
                        if nphone[0:3]==['0','1','1'] or nphone[0:3]==['0','1','0'] or nphone[0:3]==['0','1','2'] or nphone[0:3]==['0','1','5']:
                            con_info[3] = phone
                            break
                    print("plz enter valid egyptain phone number , must be equal 11 numbers")

                address = input("Enter the address : ")
                con_info[4] = address

            print(con_info)
            updated_contact=":".join(con_info)
            updated_contact = f"{updated_contact}\n"
            contactindex = allcontacts.index(l)
            print(contactindex)
            allcontacts[contactindex] = updated_contact
            file_name = f"contactbook_{con_info[6]}.csv"
            break
    else:
        return editContact()

    w = open("all_Contacts.csv", "w")
    w.writelines(allcontacts)
    w.close()

    s = open(f"{file_name}", "w")
    s.writelines(allcontacts)
    s.close()

    print("=================== Updated Successfully ===================")
