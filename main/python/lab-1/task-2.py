

while True :
    year = input("Enter the year : ")
    if year.isdigit() :
        year=int(year)
        break
    else:
        continue

def myfun (my_year) :

    if (my_year % 4 == 0 and my_year % 4 == 0) or (my_year % 4 == 0 and my_year % 4 != 0) :
        return ( print("True") )
    else:
        return( print("False") )

myfun(year)