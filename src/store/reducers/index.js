import { SET_PARTY_LIST } from '../constants';

const initialState = {
  partyList: [],
};

export const listState = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTY_LIST: {
      return {
        ...state,
        partyList: [...action.payload],
      };
    }
    default:
      return state;
  }
};
