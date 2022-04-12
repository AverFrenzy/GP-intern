import { put, call, spawn, all, select } from 'redux-saga/effects';
import {
  getColaInfo,
  getCurrencyInfo,
  getDietsInfo,
  getParticipantsInfo,
  getPizzaInfo,
} from '../../services/pizzaService';
import {
  SET_COLA_INFO,
  SET_CURRENCY_INFO,
  SET_DIETS,
  SET_PARTICIPANTS,
  SET_PIZZA_INFO,
} from '../constants';
import { choosePizza } from '../../services/pizzaHelpers';

export function* getParticipantsData() {
  const participantsData = yield call(getParticipantsInfo);
  yield put({ type: SET_PARTICIPANTS, payload: participantsData.party });
}

export function* getDietData() {
  const participantsData = yield select((state) => state.participantsData);
  const participantsNames = participantsData.map((person) => person.name);

  const dietData = yield call(getDietsInfo, participantsNames);
  yield put({ type: SET_DIETS, payload: dietData.diet });
}

export function* getOrderData() {
  const participantsData = yield select((state) => state.participantsData);
  const dietData = yield select((state) => state.dietsData);

  const vegansList = dietData.filter((person) => person.isVegan).map((person) => person.name);
  const pizzaEaters = participantsData.filter((person) => person.eatsPizza);
  const vegansPercent = (vegansList.length / participantsData.length) * 100;
  const typeOfPizza = choosePizza(vegansPercent);

  const orderData = yield all([
    call(getPizzaInfo, typeOfPizza, pizzaEaters.length),
    call(getColaInfo, participantsData.length),
    call(getCurrencyInfo),
  ]);

  yield put({ type: SET_PIZZA_INFO, payload: orderData[0] });
  yield put({ type: SET_COLA_INFO, payload: orderData[1] });
  yield put({ type: SET_CURRENCY_INFO, payload: orderData[2] });
}

export function* loadData() {
  yield call(getParticipantsData);
  yield call(getDietData);
  yield call(getOrderData);
}

export default function* rootSaga() {
  yield spawn(loadData);
}
