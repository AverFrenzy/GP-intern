import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_PARTY_INFO } from '../constants';
import { setPartyInfo } from '../actions';
import { getParticipantsInfo } from '../../services/pizzaService';

export function* workerSaga() {
  const { party } = yield call(getParticipantsInfo);
  yield put(setPartyInfo(party));
}

export function* watchSaga() {
  yield takeEvery(GET_PARTY_INFO, workerSaga);
}

export default function* rootSaga() {
  yield watchSaga();
}
