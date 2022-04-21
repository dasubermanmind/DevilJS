/*
* The Official Devil Programming language
* AST Interpreter
* */

const assert = require('assert');
const Enviroment = require('./Environment');

class Devil {

     constructor(global = new Enviroment(), parent=null) {
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
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }

        if (exp[0] === '*') {
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        if (exp[0] === '/') {
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }

        // to create a variable we go with the pattern of (dev x 0)
        // By default All variables are immutable
        // We must add functionality to make it mutable 
        if( exp[0] === 'dev') {
            const [_, name, value] = exp;
            return Object.freeze(env.define(name, this.eval(value, env)));
        }

        // TODO: Mutable Case
        // We can define a variable as mutable by using the keyword `mut`
        // (dev mut x 0)
        if( exp[0] === 'dev' && exp[1] === 'mut') {
            const [_, name, value] = exp;
            return env.define(name,this.eval(value, env));
        }

        if(exp[0] === 'set') {
            const [_, name, value] = exp;
            return env.assign(name,this.eval(value,env)); 
        }

        if (isVariableName(exp)) {
            return env.lookup(exp);
        }

        // Now we begin by thinking of block scope, a sequence of expressions
        // So as we create more and more blocks (scopes) each of them must retain
        // and hold the records as well as know what has been defined within the
        // parent
        if (exp[0] === 'begin') {
            const blockEnv = new Enviroment( {}, env);
            return this._evalBlock(exp, blockEnv);
        }

        throw `Not implemented yet. The Devil can only work so fast. Please be patient. Issue is = ${JSON.stringify(exp)}`;
    }

    // We care about scope which block it is in; Sequence of expressions
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

module.exports = Devil;
