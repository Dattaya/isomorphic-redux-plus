import injectMiddleware from 'lib/injectMiddleware';

describe('injectMiddleware', () => {
  let next;
  beforeEach(() => {
    next = sinon.stub();
  });

  it('will inject dependencies', () => {
    const injectDeps = injectMiddleware;
    expect(injectDeps).to.be.a('function');
  });

  it('is shaped like middleware', () => {
    const injectStore = injectMiddleware();
    expect(injectStore).to.be.a('function');

    const injectNext = injectMiddleware()();
    expect(injectNext).to.be.a('function');

    const handleAction = injectMiddleware()()();
    expect(handleAction).to.be.a('function');
  });

  it('passes actions through when action is not a function', () => {
    const underTest = injectMiddleware()()(next);
    const input = Math.random();
    const expected = input;

    underTest(input);

    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWithExactly(expected);
  });

  describe('when action is a function', () => {
    const dep1 = Math.random();
    const dep2 = Math.random();
    const store = Math.random();
    const nextAction = Math.random();
    const action = sinon.stub().returns(nextAction);

    beforeEach(() => {
      injectMiddleware({ dep1, dep2 })(store)(next)(action);
    });

    it('invokes action with injected dependencies and store', () => {
      expect(action).to.have.been.calledOnce;
      expect(action).to.have.been.calledWithExactly({ dep1, dep2, store });
    });

    it('fires the return value of the action', () => {
      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWithExactly(nextAction);
    });
  });
});
