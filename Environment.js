/*
 * Base class for Environments of DevilsJS
 * */

// TODO: The API of the environment is as follows: 
// 1) Create a variable with a (name, value) \
// **Note: The value is immutable by default
// 2) If defined as mutable, Update the existing variable
// 3) Return the value of a defined variable or throw error if not created within the correct scope
// 4) Return the Specific environment in which a variable is declared in

class Environments {

    constructor(record = {}, parent=null) {
        this.record = record;
        this.parent = parent;
    }

    define(name, value) {
        this.record[name] = value;
        return value;
    }

    assign(name, value) {
        this.resolve(name).record[name] = value;
        return value;
    }

    lookup(name) {
        if(!this.record.hasOwnProperty(name)){
            throw new ReferenceError(`Variable ${name} is not defined`);
        }
        return this.record[name];
       //return this.resolve(name).record[name];
    }

    resolve(name) {}


}

module.exports = Environments;
