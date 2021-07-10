const { prompt } = require('inquirer');
const fs = require('fs');
const dbData = require('./db/connection');
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

//query db to view all departments
function seeDepartments() {
    dbData.query(`SELECT * FROM department`, (err, result) => {
        console.table(result);
        return userQuestions();
    })
};


function seeRoles() {
    dbData.query(`SELECT * FROM roles`, (err, result) => {
        console.table(result);
        return userQuestions();
    })
};

function seeEmployees() {
    db.selectAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.log("\n")
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
userQuestions();