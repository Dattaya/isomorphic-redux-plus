import fetchData from 'lib/fetchData';
import fetchComponentData from 'lib/fetchComponentData';

describe('fetchComponentData', () => {
  it('is a function', () => {
    expect(fetchComponentData).to.be.a('function');
  });

  // eslint-disable-next-line max-len
  it('calls the fetchData method of each component with the current state, the dispatch function, and params', () => {
    const store = {
      dispatch: Math.random(),
      state: Math.random(),
    };

    const componentResult = Math.random();
    const componentFetchData = sinon.stub().returns(Promise.resolve(componentResult));
    const components = [{
      fetchData: componentFetchData,
    }];

    const params = Math.random();
    const expected = [componentResult];

    return fetchComponentData(store, components, params).then((actual) => {
      expect(actual).to.deep.equal(expected);
      expect(componentFetchData).to.have.been.calledOnce;
      expect(componentFetchData).to.have.been.calledWithExactly(
        store.state,
        store.dispatch,
        params
      );
    });
  });

  it('does nothing when passed no components', () => {
    const store = {
      dispatch: Math.random(),
      state: Math.random(),
    };

    const components = [];

    const params = Math.random();

    const expected = [];
    return fetchComponentData(store, components, params).then((actual) => {
      expect(actual).to.deep.equal(expected);
    });
  });

  it('ignores components that do not have a fetchData method', () => {
    const store = {
      dispatch: Math.random(),
      state: Math.random(),
    };

    const components = [{}];

    const params = Math.random();

    const expected = [];

    return fetchComponentData(store, components, params).then((actual) => {
      expect(actual).to.deep.equal(expected);
    });
  });

  it('works with components decorated with @fetchData', () => {
    const store = {
      dispatch: Math.random(),
      state: Math.random(),
    };

    const componentResult = Math.random();
    const componentFetchData = sinon.stub().returns(Promise.resolve(componentResult));
    @fetchData(componentFetchData)
    class TestComponent {}

    const components = [TestComponent];

    const params = Math.random();

    const expected = [componentResult];

    return fetchComponentData(store, components, params).then((actual) => {
      expect(actual).to.deep.equal(expected);
      expect(componentFetchData).to.have.been.calledOnce;
    });
  });
});
