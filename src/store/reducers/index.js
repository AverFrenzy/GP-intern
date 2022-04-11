import { GET_PARTY_INFO } from '../constants';

const initialState = {
  partyInfo: [],
};

export const listState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTY_INFO: {
      return {
        ...state,
        partyInfo: [...action.payload],
      };
    }
    default:
      return state;
  }
};
