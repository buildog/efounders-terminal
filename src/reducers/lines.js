const initialState = [];

const linesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXECUTE_COMMAND': {
      if(action.command.toLowerCase() === "clear") {
        return action.lines;
      } else {
        return [...state, ...action.lines];
      }
    }
    case 'CLEAR': {
        return initialState;
    }
    default: {
      return state;
    }
  }
};

export { linesReducer as default, initialState };
