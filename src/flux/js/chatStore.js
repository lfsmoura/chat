import { createStore } from 'redux';

const chatReducer = (state, action) => {
  state = state || { msgs: [] };
  return state;
};

export var chatStore = createStore(chatReducer);
