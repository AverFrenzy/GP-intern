import { GET_PARTY_INFO, SET_PARTY_LIST, SET_VEGANS_BOOK } from '../constants';

export const getPartyInfo = () => ({
  type: GET_PARTY_INFO,
});

export const setPartyList = (payload) => ({
  type: SET_PARTY_LIST,
  payload,
});

export const setVegansBook = (payload) => ({
  type: SET_VEGANS_BOOK,
  payload,
});
