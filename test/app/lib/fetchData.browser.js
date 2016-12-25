import React, { Component } from 'react';
import { mount } from 'enzyme';

describe('fetchData', () => {
  let fetchData;
  let rendered;
  before(() => loadTested(__dirname, __filename, ({ default: i, rendered: r }) => {
    fetchData = i;
    rendered = r;
  }));

  it('is a decorator/shorthand react component (function)', () => {
    expect(fetchData).to.be.a('function');
  });

  it('does not trigger during initial data loading (on the server-side)', () => {
    const fetchDataMethod = sinon.stub();
    @fetchData(fetchDataMethod)
    class TestComponent extends Component {
      render() {
        return <div />;
      }
    }
    sinon.spy(TestComponent.prototype, 'componentDidMount');

    mount(<TestComponent />); // eslint-disable-line no-unused-vars
    expect(TestComponent.prototype.componentDidMount).to.have.been.calledOnce;
    expect(fetchDataMethod).not.to.have.been.called;
  });

  it('triggers after initial loading (on the client-side)', () => {
    const fetchDataMethod = sinon.stub();
    @fetchData(fetchDataMethod)
    class TestComponent extends Component {
      render() {
        return <div />;
      }
    }
    sinon.spy(TestComponent.prototype, 'componentDidMount');
    const state = Math.random();
    const dispatch = sinon.stub();
    const params = {};

    rendered();
    mount(<TestComponent params={params} />, {
      context: {
        store: {
          dispatch,
          getState: sinon.stub().returns(state),
        },
      },
    }); // eslint-disable-line no-unused-vars
    expect(TestComponent.prototype.componentDidMount).to.have.been.calledOnce;
    expect(fetchDataMethod).to.have.been.calledOnce;
    expect(fetchDataMethod).to.have.been.calledWithExactly(state, dispatch, params);
  });
});
