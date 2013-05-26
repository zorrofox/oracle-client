var persist = require("persist");
var type = persist.type;

department = persist.define('department', {
    'id' : {
        type : type.INTEGER,
        dbColumnName : 'department_id',
        primaryKey : true
    },
    'department_name' : type.STRING
});

employee = persist.define('employee', {
    'id' : {
        type : type.INTEGER,
        dbColumnName : 'employee_id',
        primaryKey : true
    },
    'employee_name' : type.STRING
}).hasOne(department);

persist.connect({
    "driver" : "oracle",
    "hostname" : "localhost",
    "user" : "hr",
    "password" : "welcome1",
    trace : true
}, function(err, connection) {
    employee.include('department').all(connection, function(err, employees) {
        if(err)
              console.log(err);     
    });

});