import assert from 'assert';
import User from './user';

describe('User class', () => {
  it('constructor takes 5 params', () => {
    assert.ok(User.length === 5);
  });
});
