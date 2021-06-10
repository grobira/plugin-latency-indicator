import { combineReducers } from 'redux';

import { reduce as NetworkLatencyReducer } from './LatencyState';

// Register your redux store under a unique namespace
export const namespace = 'network-latency';

// Combine the reducers
export default combineReducers({
  networkLatency: NetworkLatencyReducer
});
