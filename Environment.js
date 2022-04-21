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

    //TODO: Within the environments there needs to live
    // All Algebraic types such as curry, chain, merge, deep clone etc 
    // These needs to be baked in and part of the environment so 
    // the programmer has the ability without having to import Ramda

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
        return this.resolve(name).record[name];
    }

    resolve(name) {
        if(this.record.hasOwnProperty(name)){ return this; }

        if(this.parent === null) {
            throw new ReferenceError(`Variable ${name} is not defined`);
        }

        return this.parent.resolve(name);
    }

}

module.exports = Environments;
