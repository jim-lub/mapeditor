import { configureTestStore } from 'state/store';

import * as operations from '../operations';
import * as selectors from '../selectors';

describe('requestStatus/operations', () => {
  it('should set requestStatus to `REQUEST`', () => {
    const { dispatch, getState } = configureTestStore();

    dispatch( operations.setRequestStatus({
      key: 'requestStatusTest',
      type: 'REQUEST',
    }) );

    const newState = getState();
    const requestStatusTest = selectors.getRequestStatus(newState, { key: 'requestStatusTest' });

    expect(requestStatusTest).toEqual({
      initialized: false,
      loading: true,
      error: null
    })
  });
});

describe('requestStatus/operations', () => {
  it('should set requestStatus to `SUCCESS`', () => {
    const { dispatch, getState } = configureTestStore();

    dispatch( operations.setRequestStatus({
      key: 'requestStatusTest',
      type: 'SUCCESS',
    }) );

    const newState = getState();
    const requestStatusTest = selectors.getRequestStatus(newState, { key: 'requestStatusTest' });

    expect(requestStatusTest).toEqual({
      initialized: true,
      loading: false,
      error: null
    })
  });
});

describe('requestStatus/operations', () => {
  it('should set requestStatus to `FAILURE`', () => {
    const { dispatch, getState } = configureTestStore();

    dispatch( operations.setRequestStatus({
      key: 'requestStatusTest',
      type: 'FAILURE',
      error: "Error requesting test data"
    }) );

    const newState = getState();
    const requestStatusTest = selectors.getRequestStatus(newState, { key: 'requestStatusTest' });

    expect(requestStatusTest).toEqual({
      initialized: true,
      loading: false,
      error: expect.any(String)
    })
  });
});
