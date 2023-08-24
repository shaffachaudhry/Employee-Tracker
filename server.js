const inquirer = require("inquirer");
const db = require('./db/connection');

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the company_db database');
  company_tracker();
});