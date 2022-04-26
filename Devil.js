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

        if( exp[0] === '<') {
            return this.eval(exp[1], env) < this.eval(exp[2], env);
        }

        if (exp[0] === '>') {
            return this.eval(exp[1], env) > this.eval(exp[2], env);
        }

        if (exp[0] === '<=') {
            return this.eval(exp[1], env) <= this.eval(exp[2], env);
        }

        if( exp[0] === '>=') {
            return this.eval(exp[1], env) >= this.eval(exp[2], env);
        }

        if( exp[0] === 'dev') {
            const [_, name, value] = exp;
            return Object.freeze(env.define(name, this.eval(value, env)));
        }

        // We can define a variable as mutable by using the keyword `mut`
        if( exp[0] === 'dev' && exp[1] === 'mut') {
            const [_, name, value] = exp;
            return env.define(name,this.eval(value, env));
        }

        if(exp[0] === 'set') {
            const [_, name, value] = exp;
            return env.assign(name,this.eval(value,env)); 
        }

        if (exp[0] === 'if') {
            const [ _ , tag , condition, consequent, alternative] = exp;
            if(this.eval(condition, env)) {
                return this.eval(consequent, env);
            }

            return this.eval(alternative, env);
        }

        if( exp[0] === 'while') {
            const [_, tag, condition, body] = exp;
            let result;
            while(this.eval(condition, env)) {
                result = this.eval(body, env);
            }
            return result;
        }

        if (exp[0] === 'def') {
            const [_, tag, name, params, body] = exp;
            const fn = {
                params,
                body,
                env,
            };

            return env.define(name, fn);
        }

        if (isVariableName(exp)) {
            return env.lookup(exp);
        }

        if (exp[0] === 'begin') {
            const blockEnv = new Enviroment( {}, env);
            return this._evalBlock(exp, blockEnv);
        }


        if (Array.isArray(exp)){
            const activationRecord = {};
            const fnName = this.eval(exp[0], env);
            // check for native fn
            const args = exp.splice(1).map(arg => this.eval(arg,env));

            if(typeof fn === 'function'){
                return fn(...args);
            }

            fn.params.forEach((param, idx) =>{
                activationRecord[param] = args[idx];
            });

            const envenv = new Enviroment(activationRecord, fn.env);

            return this.evalBody(fn.body, activationRecord);
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

    evalBody(body, env) {
        if (body[0] === 'begin'){
            return this._evalBlock(body, env);
        }

        return this.eval(body,env);
    }
}

//TODO: Break this off into its own helper dir
function isNumber(exp) {
    return typeof exp === 'number';
}

function isString(exp) {
    return typeof exp === 'string' && exp[0].slice(-1) === '"';

}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}


//TODO: Set all Global enviroments herei

module.exports = Devil;
