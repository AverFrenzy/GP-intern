import { SET_PARTY_LIST, SET_VEGANS_BOOK } from '../constants';

const initialState = {
  partyList: [],
  veganBook: [],
};

export const listState = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTY_LIST: {
      return {
        ...state,
        partyList: [...action.payload],
      };
    }
    case SET_VEGANS_BOOK: {
      return {
        ...state,
        veganBook: [...action.payload],
      };
    }
    default:
      return state;
  }
};
