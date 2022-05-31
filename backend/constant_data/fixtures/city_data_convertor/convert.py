import csv
import json

data = []

with open('./ostan.csv') as csvFile:
    reader = csv.reader(csvFile)
    next(reader)
    for row in reader:
        data.append({'model': 'constant_data.city', 'pk': row[0],
                     'fields': {'fa_name': row[1], 'name': row[1]}})

with open('./shahrestan.csv') as csvFile:
    reader = csv.reader(csvFile)
    next(reader)
    for row in reader:
        data.append({'model': 'constant_data.city', 'pk': 60 + int(row[0]),
                     'fields': {'fa_name': row[1], 'name': row[1], 'parent':
                                row[2]}})


fl = open("0001-cities.json", 'w')

json.dump(data, fl)

fl.close()
