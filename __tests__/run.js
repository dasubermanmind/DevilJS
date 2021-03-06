const Devil = require('../Devil');
const Environment = require('../Environment');
const { test } = require('./test_helper/test-helper');

const tests = [
  require('./self-eval-test.js'),
  require('./math-test.js'),
  require('./variable-test.js'),
  require('./block-test.js'),
  require('./if-test'),
  require('./user-defined-function-test'),
//  require('./iterations-test'),
  ];

const devil = new Devil(new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '1.0.0',
}));

tests.forEach(test => test(devil));

console.log('In Theory if you see this all tests have passed! :)');
