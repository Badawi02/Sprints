
def displayAllContacts():
    try:
        operation = open(f"all_Contacts.csv", "r")
    except Exception as err:
            print(err)
    else:
        contacts = operation.readlines()
        print("====================== Your Contacts =============================")
        print("Fname:Lname:Email:Phone:Address:Date")
        for contact in contacts:
            print(contact.strip("\n"))
        return contacts


def deleteContact ():
    allContact = displayAllContacts()
    Contactdelete = input("please enter the Fname of the contact you want to delete : ")
    print(Contactdelete)
    for l in allContact:
        con_info= l.strip("\n")
        con_info = con_info.split(":")
        if con_info[0] == Contactdelete:
            allContact.remove(l)
            print("======== Contact found and remove it ==========")
            file_name = f"contactbook_{con_info[6]}.csv"
            break
    else:
        print("========   Can not found   ==========")
        return deleteContact()

    w = open("all_Contacts.csv", "w")
    w.writelines(allContact)
    w.close()



    operation = open(f"{file_name}", "r")
    contacts = operation.readlines()
    for l in contacts:
        con_info= l.strip("\n")
        con_info = con_info.split(":")
        if con_info[0] == Contactdelete:
            contacts.remove(l)
            break

    w = open(f"{file_name}", "w")
    w.writelines(contacts)
    w.close()