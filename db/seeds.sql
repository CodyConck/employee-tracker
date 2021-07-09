INSERT INTO department(department_name)
VALUES
('Sales'),
('Human resources');

INSERT INTO roles(title, salary, department_id)
VALUES
('Sales Manager', '55', 1),
('HR Manager', '45', 1),
('Sales Associate', '40', 2),
('HR Associate', '40', 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Tiger', 'Woods', 1, NULL),
('John', 'Rahm', 1, NULL),
('Dustin', 'Johnson', 2, NULL),
('Lexi', 'Thompson', 2, NULL),
('Brooks', 'Koepka', 3, 1),
('Jordan', 'Speith', 4, 2),
('Daniel', 'Berger', 4, 3),
('Phil', 'Mickelson', 4, 4),
('Ernie', 'Els', 3, 1),
('Colin', 'Morikowa', 3, 2);

