/*
* The Official Devil Programming language
* AST Interpreter
* */


//TODO: the Devil Parser will be imported here
const fs = require('fs');

class Devil {

    // TODO: Define Global Enviroment, these will define what operators the devil programmer can use
    constructor(global=GlobalEnvironments) {
        this.global = global;
        //TODO: create a new Transormer object

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
