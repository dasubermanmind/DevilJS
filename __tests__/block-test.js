const assert = require('assert');

module.exports = devil => {
  assert.strictEqual(devil.eval(
    ['begin',

      ['dev', 'x', 10],
      ['dev', 'y', 20],

      ['+', ['*', 'x', 'y'], 30],

    ]),

  230);

  // Nested environments.

  assert.strictEqual(devil.eval(
    ['begin',

      ['dev', 'x', 10],

      ['begin',

        ['dev', 'x', 20],
        'x'

      ],

      'x'

    ]),

  10);

   //TODO:
  // Access parent variables:
  // Identifier Resolution.
};
