/*
* The Official Devil Programming language
* AST Interpreter
* */


//TODO: the Devil Parser will be imported here
//const fs = require('fs');
const assert = require('assert');

const {isNumberObject} = require('util/types');

class Devil {

    // TODO: Define Global Enviroment, these will define what operators the devil programmer can use
    constructor(global) {
        this.global = global;
        //TODO: create a new Transormer object

    }

    // TODO: Eventually these will be in a helper class
    eval(exp) {
        if(isNumber(exp)) {
            return exp;
        }

        if(isString(exp)){
            return exp.slice(1,-1);
        }

        // this in inlined for now
        // but will live in environment
        // This handles simple case, but embedded (ie expression + expression)+expressiom 
        if(exp[0] === '+') {
            // this handles both cases
            return this.eval(exp[1]) + this.eval(exp[2]);
        }

        throw 'Not implemented yet. The Devil can only work so fast. Please be patient.';
    }

    
    _eval(body, env=this.global) {
        //TODO: This will evaluate each expression in a specific environment | Defaults to Global

    }

    _evalBody (body, env) {
        if (body[0] == 'begin') { 
            return this._evalBlock(body,env);
        }
        return this.eval(body,env);
    }
}

function isNumber(exp) {
    return typeof exp === 'number';
}


function isString(exp) {
    return typeof exp === 'string' && exp[0].slice(-1) === '"';

}


// TODO: Move these to its own test dir
// For now this is fine for local dev

const devil = new Devil();

assert.strictEqual(devil.eval(['+', 1, 5]), 6);
assert.strictEqual(devil.eval('"TEST"'), 'TEST')
assert.strictEqual(devil.eval(['+', ['+', 3, 2], 5]), 10);

console.log('In Theory all these tests have passed if you see this');

module.exports = Devil;
