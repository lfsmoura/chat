import { createStore } from 'redux';

const chatReducer = (state, action) => {
  state = state || { messages: [], autoScroll: true, userId: new Date().getTime() };

  if (action.type === "ADD-MESSAGE") {
    let messages = action.message;
    if (!messages.length) {
      messages = [action.message];
    }
    return Object.assign({}, state, {
        messages: state.messages.concat(messages)
      });
  } else if (action.type === "TOGGLE-AUTOSCROLL") {
    return Object.assign({}, state, { autoScroll: !state.autoScroll });
  }
  return state;
};

export var chatStore = createStore(chatReducer);
