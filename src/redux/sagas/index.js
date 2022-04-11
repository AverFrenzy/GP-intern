import { put, call, spawn, all } from 'redux-saga/effects';
import {
  getColaInfo,
  getCurrencyInfo,
  getDietsInfo,
  getParticipantsInfo,
  getPizzaInfo,
} from '../../services/pizzaService';

const PIZZA_TYPES = {
  CHEESE: 'cheese',
  MEAT: 'meat',
  VEGAN: 'vegan',
};

const choosePizza = (vegansPercent) => {
  if (vegansPercent > 51) {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber ? PIZZA_TYPES.CHEESE : PIZZA_TYPES.VEGAN;
  }
  return PIZZA_TYPES.MEAT;
};

export function* loadData() {
  const participantsData = yield call(getParticipantsInfo);
  const dietData = yield call(() =>
    getDietsInfo(participantsData.party.map((person) => person.name))
  );

  const vegansList = dietData.diet.filter((person) => person.isVegan).map((person) => person.name);
  const pizzaEaters = participantsData.party.filter((person) => person.eatsPizza);
  const vegansPercent = (vegansList.length / participantsData.party.length) * 100;
  const typeOfPizza = choosePizza(vegansPercent);

  const orderData = yield all([
    call(() => getPizzaInfo(typeOfPizza, pizzaEaters.length)),
    call(() => getColaInfo(participantsData.party.length)),
    call(() => getCurrencyInfo()),
  ]);

  yield put({ type: 'SET_PARTICIPANTS', payload: participantsData.party });
  yield put({ type: 'SET_DIETS', payload: dietData.diet });
  yield put({ type: 'SET_PIZZA_INFO', payload: orderData[0] });
  yield put({ type: 'SET_COLA_INFO', payload: orderData[1] });
  yield put({ type: 'SET_CURRENCY_INFO', payload: orderData[2] });
}

export default function* rootSaga() {
  yield spawn(loadData);
}
