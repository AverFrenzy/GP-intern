import { GET_PARTY_INFO } from '../constants';

export const getPartyInfo = (value) => ({
  type: GET_PARTY_INFO,
  payload: value,
});
