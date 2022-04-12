import { SET_PARTY_LIST, SET_VEGANS_BOOK, SET_ORDER_INFO } from '../constants';

const initialState = {
  partyList: [],
  dietBook: [],
  orderInfo: [],
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
        dietBook: [...action.payload],
      };
    }
    case SET_ORDER_INFO: {
      return {
        ...state,
        orderInfo: [...action.payload],
      };
    }
    default:
      return state;
  }
};
