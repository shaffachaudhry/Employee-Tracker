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
      name: ' department',
      message: 'Enter the name of the department you wish to add',
      validate: departmentName => {
          if (departmentName) {
              return true;
          } else {
              console.log('Please enter a department name');
              return false;
          }}
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
}
// update employee role 
//prompts for employee role + manager + store in var
// prompts to update employree + rol;w

// else if (answers.prompt === 'exit') {
//   db.end();
//   console.log("bye!");
// }

})
};