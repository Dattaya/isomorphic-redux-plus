import promiseMiddleware, {
  createRequest,
  injected,
} from 'lib/promiseMiddleware';

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

  describe('when meta.injected is true and payload is a function', () => {
    it('fires the _REQUEST action immediately instead of the action proper', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const payload = () => Promise.resolve();
      const meta = { inject: true };

      const input = { type, payload, meta };

      const expected = { type: `${type}_REQUEST`, meta };

      // Ignore exceptions, all we care about is _REQUEST being fired
      try {
        underTest(input);
      } catch (e) {} // eslint-disable-line no-empty

      expect(next).to.have.been.calledOnce;
      expect(next).not.to.have.been.calledWithExactly(input);
      expect(next).to.have.been.calledWithExactly(expected);
    });

    it('fires the action when the promise resolves', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const data = Math.random();
      const payload = () => Promise.resolve({ data });
      const meta = { inject: true };

      const input = { type, payload, meta };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ ...input, payload: data });
      });
    });

    it('forwards all meta data', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const data = Math.random();
      const payload = () => Promise.resolve({ data });
      const meta = { inject: true, foo: Math.random(), bar: Math.random };

      const input = { type, payload, meta };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ ...input, payload: data });
      });
    });

    it('fires the action with `error: true` when a promise rejects', () => {
      const underTest = promiseMiddleware()()(next);

      const type = Math.random();
      const err = Math.random();
      const payload = () => Promise.reject(err);
      const meta = { inject: true };

      const input = { type, payload, meta };

      return underTest(input).then(() => {
        expect(next).to.have.been.calledTwice;
        expect(next.secondCall.args[0]).to.deep.equal({ ...input, payload: err, error: true });
      });
    });
  });
});

describe('injected', () => {
  let type;
  let payload;
  let meta;

  beforeEach(() => {
    type = Math.random();
    payload = Math.random();
    meta = { foo: Math.random() };
  });

  it('creates FSAs', () => {
    expect(
      injected(type, payload, meta)
    ).to.have.all.keys(['type', 'payload', 'meta']);
  });

  it('adds inject true to existing meta data', () => {
    expect(
      injected(type, payload, meta)
    ).to.contain.all.keys({
      meta: { ...meta, inject: true },
    });
  });

  it('adds a meta object with inject true, when no meta is provided', () => {
    expect(
      injected(type, payload)
    ).to.contain.all.keys({
      meta: { inject: true },
    });
  });

  it('should not mutate meta', () => {
    expect(
      injected(type, payload, meta).meta
    ).to.not.equal(meta);
  });
});


describe('createRequest', () => {
  let type;
  let config;
  let meta;

  beforeEach(() => {
    type = Math.random();
    config = Math.random();
    meta = { foo: Math.random() };
  });

  it('properly formats into an FSA that the promiseMiddleware will intercept', () => {
    const action = createRequest(type, config, meta);
    const expectedMeta = { ...meta, inject: true };

    expect(action.meta).to.deep.equal(expectedMeta);
    expect(action.payload).to.be.a('function');
  });

  it('calling payload should call client with the config object', () => {
    const client = sinon.spy();

    createRequest(type, config).payload({ client });

    expect(client).to.have.been.calledWithExactly(config);
  });

  it('calling payload should return the output of client', () => {
    const client = sinon.stub().returns(Math.random());

    expect(
      createRequest(type, config).payload({ client })
    ).to.equal(client());
  });
});
