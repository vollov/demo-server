#demo-sevrer

The backend server for demo front ends 

##Implementation
api.vollov.ca offer read only service

GET		/api/count/:collection		(total number of records)
GET		/api/postcodes/:segment		(50 records per segment)
GET		/api/setting/1
GET		/api/postcode/:id
GET		/api/options
[
	{name: 'entry1', value: 0},
	{name: 'entry2', value: 1},
	{name: 'entry3', value: 2}
]

##Setup
[1] To import seed data into mongodb:
$mongo localhost:27017/demo schema.js

git remote set-url origin git@github.com:vollov/demo-sever.git
