const assert = require('assert');
const devilParser = require('../../parser/devilParser');

const test = (devil, code, expectedResult) => {
    const expression = devilParser.parse(`(begin ${code})`);
    assert.strictEqual(devil.evalGlobal(expression), expected);
}


module.exports = {
    test,
};
