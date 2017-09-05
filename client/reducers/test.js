import { TEST } from '../actions/test';

export default (state = { }, { type, payload }) => {
  switch (type) {
    case TEST:
      return { ...state, payload };
    default:
      return state;
  }
};
