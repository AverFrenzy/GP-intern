import { takeLatest, put, call, select, all } from 'redux-saga/effects';
import { GET_PARTY_INFO } from '../constants';
import { setPartyList, setVegansBook, setOrderInfo } from '../actions';
import {
  getParticipantsInfo,
  getDietsInfo,
  getColaInfo,
  getPizzaInfo,
  getCurrencyInfo,
} from '../../services/pizzaService';
import { choosePizza } from '../../services/helpers';
import * as selectors from '../selectors';

export function* getPartyList() {
  const { party } = yield call(getParticipantsInfo);
  yield put(setPartyList(party));
}

export function* getDietBook() {
  const partyList = yield select(selectors.partyList);
  const pizzaEaters = partyList.filter(({ eatsPizza }) => eatsPizza).map(({ name }) => name);

  const { diet } = yield call(getDietsInfo, pizzaEaters);
  yield put(setVegansBook(diet));
}

export function* getOrderInfo() {
  const partyList = yield select(selectors.partyList);
  const dietBook = yield select(selectors.dietBook);

  const vegansList = dietBook.filter(({ isVegan }) => isVegan);
  const vegansPercent = (vegansList.length / dietBook.length) * 100;
  const typeOfPizza = choosePizza(vegansPercent);

  const orderData = yield all([
    call(getPizzaInfo, typeOfPizza, dietBook.length),
    call(getColaInfo, partyList.length),
    call(getCurrencyInfo),
  ]);
  yield put(setOrderInfo(orderData));
}

export function* getPartyInfo() {
  yield getPartyList();
  yield getDietBook();
  yield getOrderInfo();
}

export function* watchSaga() {
  yield takeLatest(GET_PARTY_INFO, getPartyInfo);
}

export default function* rootSaga() {
  yield watchSaga();
}
