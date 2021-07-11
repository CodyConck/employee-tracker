const { prompt } = require('inquirer');
const fs = require('fs');
//const dbData = require('./db/connection');
const db = require('./db/index');
const { table } = require('console');

function userQuestions() {
    prompt([{
        type: 'list',
        name: 'menu',
        message: 'Plese select one of the following options:',
        choices: ['View All Departments', 'View Roles', 'View Employees', 'Add Departments', 'Add Roles', 'Add Employee', 'Update Employee']
    }])
        .then((answer) => {
            switch (answer.menu) {
                case 'View All Departments':
                    seeDepartments();
                    break;
                case 'View Roles':
                    seeRoles();
                    break;
                case 'View Employees':
                    seeEmployees();
                    break;
                case 'Add Departments':
                    addDepartmentsPrompt();
                    break;
                case 'Add Roles':
                    addRoles();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee':
                    updateEmployee();
                    break;
            }
        });
}

function addDepartmentsPrompt() {
    prompt([{
        type: 'list',
        name: 'addDepartment',
        message: ' Would you like to add a department?',
        choices: ['Yes', 'No']
    }
    ]).then((answer) => {
        switch (answer.addDepartment) {
            case 'Yes':
                addNewDepartment();
                break;
            case 'No':
                userQuestions();
                break;
        }
    })
}

function seeDepartments() {
    db.seeAllDepartments()
    .then(([rows]) => {
        let departments = rows
        console.log('\n')
        console.table(departments)
    })
    .then(() => userQuestions()) 
};

function seeRoles() {
    db.seeAllRoles()
    .then(([rows]) => {
        let roles = rows
        console.log('\n')
        console.table(roles)
    })
    .then(() => userQuestions()) 
};

function seeEmployees() {
    db.selectAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.log('\n')
        console.table(employees)
    })
    .then(() => userQuestions())
}

function addNewDepartment() {
    prompt([{
        name: 'name',
        message: 'Please enter the name of your new department.'
    }]).then(res => {
        let name = res
        db.createDepartment(name)
            .then(() => console.log(`added ${name.name} to the db`))
            .then(() => userQuestions())
    })
}
 function addRoles() {
    prompt([{
        name: 'title',
        message: 'Please enter the title of the new role.'
    },
    {
        name: 'salary',
        message: 'Please enter the salary for this new role.'
    },
    {
        type: 'list',
        name: 'departmentID',
        choices: ['Sales', 'Human Resources']  
    }
    ]).then(res => {
        let { title, salary, departmentID } = res
        db.createRole(title, salary, departmentID)
            .then(() => console.log(`added ${title.title}, ${salary.salary}, ${departmentID.departmentID} to the db`))
            .then(() => userQuestions())
    })
}
function addEmployee() {
    prompt([{
        name: 'first_name',
        message: 'What is the first name of the new employee.'
    },
    {
        name: 'last_name',
        message: 'What is the last name of the new employee.'
    },
    {
        type: 'list',
        name: 'role',
        choices: ['Sales Manager', 'HR Manager', 'Sales Associate', 'HR Associate']
    },
    {
        type: 'list',
        name: 'manager',
        choices: ['Sales Manager', 'HR Manager']
    }
    ]).then(res => {
        let { first_name, last_name, role, manager } = res
        db.createEmployee(first_name, last_name, role, manager)
            .then(() => console.log(`added ${first_name.first_name}, ${last_name.last_name}, ${role.role}, ${manager.manager} to the db`))
            .then(() => userQuestions())
    })
}
userQuestions();