import assert from 'power-assert';

import pathDispatcher from '.';

before(done => {
  global.location = global.location || {};
  done();
});

describe('pathDispatcher', () => {

  describe('dispatch', () => {
    it('case / => /index.html', () => {
      global.location.pathname = '/index.html';

      let expected = false;

      const routes = {
        ['/']() {
          expected = true
        },
        '/page/': [
          () => { expected = false; },
          () => { expected = false; }
        ],
        ['/page.html']() {
          expected = false;
        }
      };

      const dispatcher = pathDispatcher(routes);
      dispatcher.dispatch();
      assert(expected);
    });
  });

});
