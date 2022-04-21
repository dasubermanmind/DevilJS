/*
* The Official Devil Programming language
* AST Interpreter
* */

const assert = require('assert');
const Enviroment = require('./Environment');

class Devil {

     constructor(global = new Enviroment()) {
         this.global = global;
    }

    eval(exp, env=this.global) {
        if(isNumber(exp)) {
            return exp;
        }

        if(isString(exp)){
            return exp.slice(1,-1);
        }

        if(exp[0] === '+') {
            return this.eval(exp[1]) + this.eval(exp[2]);
        }


        if (exp[0] === '*') {
            return this.eval(exp[1]) * this.eval(exp[2]);
        }


        if (exp[0] === '/') {
            return this.eval(exp[1] / this.eval(exp[2]));
        }

        // to create a variable we go with the pattern of (dev x 0)
        // By default All variables are immutable
        // We must add functionality to make it mutable 
        if( exp[0] === 'dev') {
            const [_, name, value] = exp;
            return Object.freeze(env.define(name, value));
        }

        // TODO: Mutable Case
        // We can define a variable as mutable by using the keyword `mut`
        // (dev mut x 0)
        if( exp[0] === 'dev' && exp[1] === 'mut') {
            const [_, name, value] = exp;
            return env.define(name,value);
        }

        if (isVariableName(exp)) {
            return env.lookup(exp);
        }

        // Now we begin by thinking of block scope, a sequence of expressions
        if (exp[0] === 'begin') {
            return this._evalBlock(exp,env);
        }

        throw `Not implemented yet. The Devil can only work so fast. Please be patient. Issue is = ${JSON.stringify(exp)}`;
    }

    // We care about scope which block it is in
    _evalBlock(block, env) {
        let result;

        const [_, tag, ...expressions] = block;
        console.log('tag', tag);
        console.log('expressions', expressions);

        expressions.forEach(exp => {
            result = this.eval(exp,env);
        });

        console.log(result);
        return result;
    }
}

function isNumber(exp) {
    return typeof exp === 'number';
}

function isString(exp) {
    return typeof exp === 'string' && exp[0].slice(-1) === '"';

}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}


// TODO: Move these to its own test dir
const devil = new Devil();

assert.strictEqual(devil.eval(['+', 1, 5]), 6);
assert.strictEqual(devil.eval('"TEST"'), 'TEST')
assert.strictEqual(devil.eval(['+', ['+', 3, 2], 5]), 10);

assert.strictEqual(devil.eval(['dev','y',100]), 100);
assert.strictEqual(devil.eval(['dev', 'x',10]), 10);

/*
assert.strictEqual(devil.eval(
    ['begin',

      ['dev', 'x', 10],
      ['dev', 'y', 20],

      ['+', ['*', 'x', 'y'], 30],

    ]),
  230);
*/
console.log('In Theory all these tests have passed if you see this');
module.exports = Devil;
