import { GET_PARTY_INFO, SET_PARTY_LIST } from '../constants';

export const getPartyInfo = () => ({
  type: GET_PARTY_INFO,
});

export const setPartyInfo = (payload) => ({
  type: SET_PARTY_LIST,
  payload,
});
