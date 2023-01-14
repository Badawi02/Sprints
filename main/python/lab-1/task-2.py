

while True :
    year = input("Enter the year : ")
    if year.isdigit() :
        year=int(year)
        break
    else:
        continue

def myfun (my_year) :
    leap = False
    
    if (my_year % 4 == 0 ) :
        leap = True
        if (my_year % 100 == 0 ) :
            leap = False
        if (my_year % 400 == 0 ) :
            leap = True
    else:
        leap = False
        
    return leap


myfun(year)
