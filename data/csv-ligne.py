import csv, unidecode

def written(data):
        file = open("main4.sql","w")

        file.write("CREATE TABLE main (sexe INT NULL, name VARCHAR(200) NULL, birth INT NULL, dpt INT NULL, numb INT NULL);\n")
        file.write("ALTER TABLE main ADD PRIMARY KEY(sexe, name, birth, dpt);\n\n")
        for col in data :
                line = "INSERT INTO main VALUES("
                for d in col :
                        if '"' not in d :
                                line = line + d + ","
                        else :
                                if d[1:-1].isdigit() == False :
                                        line = line + "'" + d[1:-1] + "'" + ","
                                else :
                                        line = line + d[1:-1] + ","
                line = line[:-1]
                file.write(line + ");\n")
        file.close()

def openAndRead(name):
        file = open(name)
        csvreader = csv.reader(file)
        header = next(csvreader)
        rows = []
        for row in csvreader:
                rows.append(row)
        file.close()
        
        for row in rows :
                row = row[0]
                d = row.split(';')
                unacceptable = False
                if '"_PRENOMS_RARES"' in d or "'" in d[2] :
                        unacceptable = True
                if unacceptable == False :
                        d.remove(d[0])
                        data.append(d)

name = ""
data = []
for i in range (1,9):
        name = "Dpt0" + str(i) + "depuis2000.csv"
        openAndRead(name)
        

for i in range (10,96):
        name = "Dpt" + str(i) + "depuis2000.csv"
        openAndRead(name)

for i in range (1,5):
        name = "Dpt97" + str(i) + "depuis2000.csv"
        openAndRead(name)
          
written(data)

print("Ready")

