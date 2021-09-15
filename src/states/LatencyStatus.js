const ACTION_SET_LATENCY_STATUS = 'SET_LATENCY_STATUS';

// Set the initial state of the below that we will use to change the buttons and UI
export const initialState = {
  latencyStatus: "EXCELLENT",
  latencyText: "Pending",
  latencyColor: "black"
};

export class Actions {
  static setLatencyStatus = (status) => ({ type: ACTION_SET_LATENCY_STATUS, status });
};

// Exporting and adding a reducer for the states we will use later for the buttons
export function reduce(state = initialState, action) {
  switch (action.type) {
    // Return the extended state and the specific status of the above states
    // it requires you pass the name/value for each you wish to update
    case ACTION_SET_LATENCY_STATUS: {
      return {
        ...state,
        ...action.status
      }
    }
    // If they unmonitor, we want to go back to the initial state
    default:
      return state;
  }
};
