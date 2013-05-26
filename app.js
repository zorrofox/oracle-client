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
});

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
}).hasOne(department).hasOne(job);

department = department.hasOne(employee, {
	foreignKey : 'manager_id'
});

persist.connect({
	"driver" : "oracle",
	"hostname" : "localhost",
	"user" : "hr",
	"password" : "welcome1",
	trace : true
}, function(err, connection) {
	job.getById(connection, 'AD_VP', function(err, myJob) {
		emp1 = new employee({
			id : 9999,
			first_name : 'Greg',
			last_name : 'Huang',
			email : 'greg.huang@oracle.com',
			phone_number : '12345678',
			hire_date : new Date(),
			salary : 1324.23,
			commission_pct : 0.10,
			job: myJob
		});
		emp1.save(connection, function(err) {
			console.log('SAVE ERROR:' + err);
		});
	});
});
