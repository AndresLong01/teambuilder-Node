const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
let choices = ["Manager", "Engineer", "Intern"];
let managerValidation = false;

function teambuilder() {
    if (managerValidation === true){
        choices = ["Engineer", "Intern"]
    }
    inquirer.prompt([
        {
            type: "list",
            message: "Input new team member role: ",
            choices: choices,
            name: "role"
        },
        {
            message: "Input new team member name: ",
            name: "name",
            // validate: function(){
            //     if (name === ""){
            //         console.log("Please enter a valid name");
            //     }
            // }
        },
        {
            message: "Input new team member ID: ",
            name: "id"
        },
        {
            message: "Input new team member email: ",
            name: "email"
        }
    ]).then(function(basicInfo) {
        if (basicInfo.role === "Manager"){
            managerValidation = true;
            inquirer.prompt([
                {
                    message: "Input Office Number: ",
                    name: "officeNumber"
                }
            ]).then(function(expandedInfo) {
                const manager = new Manager(basicInfo.name, basicInfo.id, basicInfo.email, expandedInfo.officeNumber)
                employees.push(manager);
                newMember();
            })
        } else if (basicInfo.role === "Engineer"){
            inquirer.prompt([
                {
                    message: "Input Github Username: ",
                    name: "github"
                }
            ]).then(function(expandedInfo) {
                const engineer = new Engineer(basicInfo.name, basicInfo.id, basicInfo.email, expandedInfo.github)
                employees.push(engineer);
                newMember();
            })
        } else if (basicInfo.role === "Intern"){
            inquirer.prompt([
                {
                    message: "Input school you're attending: ",
                    name: "school"
                }
            ]).then(function(expandedInfo) {
                const intern = new Intern(basicInfo.name, basicInfo.id, basicInfo.email, expandedInfo.school)
                employees.push(intern);
                newMember();
            })
        }
    })
}

function newMember() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add a new team member?",
            name: "confirm"
        }
    ]).then(function(confirmation) {
        if (confirmation.confirm === true){
            teambuilder();
        } else {
            console.log("Thank you for using our teambuilder!");
            fs.writeFile("index.html", render(employees), (err) => {if (err) throw err})
            return
        }
    })
}
teambuilder();