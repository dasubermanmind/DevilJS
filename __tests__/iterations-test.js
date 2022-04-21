const assert = require('assert');

module.exports = devil => {
  assert.strictEqual(devil.eval(
    ['begin',

      ['dev', 'counter', 0],

      ['while', ['<=', 'counter', 10],
        // counter++
        // TODO: implement ['++', <Exp>]
        ['set', 'counter', ['+', 'counter', 1]],
      ],

      'counter'

    ]),

  10);
};
