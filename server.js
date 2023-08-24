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
    message: 'Hello! Chose your ',
    choices: 
  }]).then ((answers)) => {
    if (answers.prompt=== 'View All Departments')

};