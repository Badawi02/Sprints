
from createContact import createContact
from viewContacts import viewContact
from deleteContact import deleteContact
from editContact import editContact


def ContactsMenu():
    while True:
        print("====================== HELLO MY FRIEND LET'S WRITE CONTACTS ============================")
        choice = input("please enter your choice\nc) Create you Contact\nv) view all Contacts \ne) edit in your Contacts  \nx) delete in your Contacts \nq) Exit \nEnter your choise :")
        if choice == "c":
            createContact()
        elif choice == "v":
            viewContact()
        elif choice == "x":
            deleteContact()
        elif choice == "e":
            editContact()
        elif choice == "q":
            break
        else:
            print("plz enter vaild choise")
            ContactsMenu()


ContactsMenu()



