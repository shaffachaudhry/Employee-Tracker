const inquirer = require("inquirer");
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the company_db database');
    company_tracker();
});

let company_tracker = function(){
    inquirer.prompt ([{
        type: 'list',
        name: 'prompt',
        message: 'Hello! Chose one of the following commands to proceed.',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update An Employee Role', 'Exit Interface']
    }]).then ((answers) => {
        if (answers.prompt === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Displaying All Departments: ");
                console.table(result);
                company_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Displaying All Roles: ");
                console.table(result);
                company_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Displaying All Employeees: ");
                console.table(result);
                company_tracker();
            });
        } else if (answers.prompt === 'Add Department') {
            inquirer.prompt([{
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department you wish to add',
            validate: departmentName => {
                if (departmentName) {
                    return true;
                } else {
                    console.log('Please enter a department name');
                    return false;
            }
        }
        }]).then((answers) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                if (err) throw err;
                console.log(`Added ${answers.department} to the database.`)
                company_tracker();
            });
        })
        }  else if (answers.prompt === 'Add Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                    inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter the role you wish to add.',
                        validate: inputRole => {
                        if (inputRole) {
                            return true;
                        } else {
                            console.log('Please enter a role.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the the salary related to this role',
                    validate: inputSalary => {
                        if (inputSalary) {
                            return true;
                        } else {
                            console.log('Please enter a Salary.');
                            return false;
                        }
                    }
                },
                {
                type: 'list',
                name: 'department',
                message: 'To which department is this role being added to?',
                choices: () => {
                    let array = [];
                    for (var i = 0; i < result.length; i++) {
                    array.push(result[i].name);
                    }return array;
                }
            }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                if (result[i].name === answers.department) {
                var department = result[i];
                }
            }
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
            if (err) throw err;
            console.log(` ${answers.role} has been added to the company database.`)
            company_tracker();
            });
        })
        });
        } else if (answers.prompt === 'Add Employee') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name?',
                    validate: firstName => {
                        if (firstName) {
                            return true;
                        } else {
                            console.log('Please Enter Employee First Name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employees last name?',
                validate: lastName => {
                    if (lastName) {
                        return true;
                    } else {
                        console.log('Please Enter Employee Last Name');
                        return false;
                    }
                    }
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employees?',
                choices: () => {
                    var array = [];
                    for (var i = 0; i < result.length; i++) {
                        array.push(result[i].title);
                    }
                    var  newArray = [...new Set(array)];
                    return newArray;
                }
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Enter the manager of the employee.',
                validate: managerInput => {
                    if (managerInput) {
                        return true;
                    } else {
                        console.log('Please Eneter a Manager!');
                        return false;
                    }
                }
            }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        var role = result[i];
                    }
                }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                if (err) throw err;
                console.log(` ${answers.firstName} ${answers.lastName} has been added to the database!`)
                company_tracker();
            });
            })
        });
    } else if (answers.prompt === 'Update An Employee Role') {
    db.query(`SELECT * FROM employee, role`, (err, result) => {
        if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Choose an employees to update their role.',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].last_name);
                        }
                        var employeeList = [...new Set(array)];
                        return employeeList;
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Choose the updated role?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].title);
                        }
                    var updatedRole = [...new Set(array)];
                    return updatedRole;
                }
                }
            ]).then((answers) => {
            for (var i = 0; i < result.length; i++) {
                if (result[i].last_name === answers.employee) {
                    var name = result[i];
                }
            }
            for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                    var role = result[i];
                }
            }
            db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                if (err) throw err;
                console.log(` ${answers.employee} role has been updated!`)
                company_tracker();
            });
        })
    });
} else if (answers.prompt === 'Exit Interface') {
    db.end();
    console.log("goodbye!");
    }
})
};