const assert = require('assert');

module.exports = devil => {
  assert.strictEqual(devil.eval(
    ['begin',

      ['dev', 'x', 10],
      ['dev', 'y', 0],

      ['if', ['>', 'x', 10],
        ['set', 'y', 20],
        ['set', 'y', 30],
      ],

      'y'

    ]),

  30);
};
