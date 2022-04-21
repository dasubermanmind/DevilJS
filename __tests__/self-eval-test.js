
const assert = require('assert');

module.exports = devil => {
    assert.strictEqual(devil.eval(['+', 1, 5]), 6);    
    assert.strictEqual(devil.eval(['+', 1, 5]), 6);
};


