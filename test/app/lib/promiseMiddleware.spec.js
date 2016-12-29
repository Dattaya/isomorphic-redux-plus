import promiseMiddleware from 'lib/promiseMiddleware';

describe('promiseMiddleware', () => {
  let next;
  beforeEach(() => {
    next = sinon.stub();
  });

  it('returns a function when called', () => {
    const actual = promiseMiddleware();

    expect(actual).to.be.a('function');
  });

  it('returns a function when called twice', () => {
    const actual = promiseMiddleware()();

    expect(actual).to.be.a('function');
  });

  it('returns a function when called three times', () => {
    const actual = promiseMiddleware()()();

    expect(actual).to.be.a('function');
  });

  it('passes actions through when there is no `promise` key on the action', () => {
    const underTest = promiseMiddleware()()(next);

    const input = Math.random();
    const expected = input;

    // This is an invariant that should never be violated by Math.random/Number
    expect(input).not.to.have.key('promise');

    underTest(input);

    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWithExactly(expected);
  });

  describe('resolves promises when there is a `promise` key', () => {
    it('fires the _REQUEST action immediately instead of the action proper', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();

      const input = { type, promise: {} };
      const expected = { type: `${type}_REQUEST` };

      // Ignore exceptions, all we care about is _REQUEST being fired
      try {
        underTest(input);
      } catch (e) {} // eslint-disable-line no-empty

      expect(next).to.have.been.calledOnce;
      expect(next).not.to.have.been.calledWithExactly(input);
      expect(next).to.have.been.calledWithExactly(expected);
    });

    it('fires the action when a promise resolves', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const data = Math.random();

      const input = {
        type,
        promise: () => Promise.resolve({ data }),
      };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ type, payload: data });
      });
    });

    it('fires the action with `error: true` when a promise rejects', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const err = Math.random();

      const input = {
        type,
        promise: () => Promise.reject(err),
      };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ type, error: true, payload: err });
      });
    });
  });
});
