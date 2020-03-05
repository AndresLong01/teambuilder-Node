//Complete Extension of Employee into engineer!
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}
//Exporting Every Single Role.
module.exports = Engineer;