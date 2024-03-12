import 'jest-preset-angular/setup-jest'

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    ...crypto.webcrypto,
    randomUUID: () => 'uuidv4'
  },
});
