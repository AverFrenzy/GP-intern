import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_PARTY_INFO } from '../constants';
import { setPartyList, setVegansBook } from '../actions';
import { getParticipantsInfo, getDietsInfo } from '../../services/pizzaService';

export function* workerSaga() {
  const { party } = yield call(getParticipantsInfo);
  yield put(setPartyList(party));

  const { diet } = yield call(
    getDietsInfo,
    party.map(({ name }) => name)
  );
  yield put(setVegansBook(diet));
}

export function* watchSaga() {
  yield takeEvery(GET_PARTY_INFO, workerSaga);
}

export default function* rootSaga() {
  yield watchSaga();
}
