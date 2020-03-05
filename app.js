const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//Checking the render function in the htmlRenderer.js
//render() takes in an array as an argument.
//Created an array to store all the dynamic objects created in the application.
const employees = [];
let choices = ["Manager", "Engineer", "Intern"];
let managerValidation = false;

function teambuilder() {
    //After one manager is determined and validated you can 
    //only choose engineer or intern.
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
            validate: function(name){
                if (name === "" || name === null || name === undefined){
                    console.log("Please enter a valid name");
                }else {
                    return true;
                }
            }
        },
        {
            message: "Input new team member ID: ",
            name: "id",
            validate: function(id){
                if (id === "" || id === null || id === undefined){
                    console.log("Please enter a valid id");
                }else {
                    return true;
                }
            }
        },
        {
            message: "Input new team member email: ",
            name: "email",
            validate: function(email){
                if (email === "" || email === null || email === undefined){
                    console.log("Please enter a valid email");
                }else {
                    return true;
                }
            }
        }
    ]).then(function(basicInfo) {
        //Logic controller for different roles
        if (basicInfo.role === "Manager"){
            managerValidation = true;
            inquirer.prompt([
                {
                    message: "Input Office Number: ",
                    name: "officeNumber",
                    validate: function(officeNumber){
                        if (officeNumber === "" || officeNumber === null || officeNumber === undefined){
                            console.log("Please enter a valid Office Number");
                        }else {
                            return true;
                        }
                    }
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
                    name: "github",
                    validate: function(github){
                        if (github === "" || github === null || github === undefined){
                            console.log("Please enter a valid github user");
                        }else {
                            return true;
                        }
                    }
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
                    name: "school",
                    validate: function(school){
                        if (school === "" || school === null || school === undefined){
                            console.log("Please enter a valid school");
                        }else {
                            return true;
                        }
                    }
                }
            ]).then(function(expandedInfo) {
                const intern = new Intern(basicInfo.name, basicInfo.id, basicInfo.email, expandedInfo.school)
                employees.push(intern);
                newMember();
            })
        }
    })
}
//function controlling the writing of the file and the restarting of the application
//if more team members need to be added!
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
//running my function for the first time <3
teambuilder();