const assert = require('assert');

module.exports = devil => {
  assert.strictEqual(devil.eval(['dev', 'x', 10]), 10);
  assert.strictEqual(devil.eval('x'), 10);
  assert.strictEqual(devil.eval(['dev', 'y', 100]), 100);
  assert.strictEqual(devil.eval('y'), 100);
  //  assert.strictEqual(devil.eval('VERSION'), '0.1');
  // var isUser = true;
  assert.strictEqual(devil.eval(['dev', 'isUser', 'true']), true);
  assert.strictEqual(devil.eval(['dev', 'z', ['*', 2, 2]]), 4);
  assert.strictEqual(devil.eval('z'), 4);
};
