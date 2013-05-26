var express = require('express');
var app = express();

var persist = require("persist");
var type = persist.type;

// define some model objects

department = persist.define('department', {
	'id' : {
		type : type.INTEGER,
		dbColumnName : 'department_id',
		primaryKey : true
	},
	'department_name' : type.STRING
});
job = persist.define('job', {
	'id' : {
		type : type.STRING,
		dbColumnName : 'job_id',
		primaryKey : true
	},
	'job_title' : type.STRING,
	'min_salary' : type.REAL,
	'max_salary' : type.REAL
})

employee = persist.define('employee', {
	'id' : {
		type : type.INTEGER,
		dbColumnName : 'employee_id',
		primaryKey : true
	},
	'first_name' : type.STRING,
	'last_name' : type.STRING,
	'email' : type.STRING,
	'phone_number' : type.STRING,
	'hire_date' : type.DATETIME,
	'salary' : type.REAL,
	'commission_pct' : type.REAL
}).hasOne(job, {
	createHasMany : false
}).hasOne(department, {
	createHasMany : false
});

department = department.hasOne(employee, {
	foreignKey : 'manager_id',
	createHasMany : false,
	name: 'manager'
});

persist.connect({
	"driver" : "oracle",
	"hostname" : "localhost",
	"user" : "hr",
	"password" : "welcome1",
	trace : true,
	"pooling": {
      "name": "myDatabasePool"
    }
}, function(err, connection) {

	app.get('/employee', function(req, res) {
		employee.include('job').include('department').all(connection, function(err, employees) {
			res.json(employees);
		});
	});

});

app.listen(3000);
console.log('Listening on port 3000');
