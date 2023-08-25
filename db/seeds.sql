INSERT INTO department (name)
VALUES
  ('Marketing'),
  ('Finance'),
  ('IT'),
  ('Security');

  INSERT INTO role (title, salary, department_id)
VALUES

  ('Junior Marketing Strategist', 84000, 1),
  ('Accountant', 80000, 2),
  ('Technology Support Specialist', 74000, 3),
  ('Security Officer', 67000, 4);

  INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Winston', 'Schmidt', 1, 5),
  ('Jessica', 'Day', 2, 4),
  ('Nick', 'Miller', 3, 2),
  ('Winston', 'Bishop', 4, 3);
