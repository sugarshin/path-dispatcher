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
          expected = true;
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

    it('case /page => /page/index.html', () => {
      global.location.pathname = '/page';

      let expected = false;

      const routes = {
        ['/page/index.html']() {
          expected = true;
        },
        '/otherpage/': [
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

    it('case /page.htm => /page.htm', () => {
      global.location.pathname = '/page.htm';

      let expected = false;

      const routes = {
        ['/page.htm']() {
          expected = true;
        },
        '/otherpage/': [
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

  describe('route', () => {
    it('add /otherpage/index.html', () => {
      global.location.pathname = '/otherpage/index.html';

      let expected = false;

      const dispatcher = pathDispatcher({});
      dispatcher.route('/otherpage/index.html', () => expected = true);
      dispatcher.dispatch();
      assert(expected);
    });
  });
});
