import React, { createContext, useContext, useState } from 'react';

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

const PartyContext = createContext();

export const usePartyContext = () => useContext(PartyContext);

export const PartyContextProvider = ({ children }) => {
  const [partyInfo, setPartyInfo] = useState([]);
  const [eatPizza, setEatPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moneyToCollect, setMoneyToCollect] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [collectedMoney, setCollectedMoney] = useState(0);
  const [percentPaid, setPercentPaid] = useState(0);
  const [percentFeedback, setPercentFeedback] = useState(0);
  const [billFilterQuery, setBillFilterQuery] = useState('');
  const [feedbackFilterQuery, setFeedbackFilterQuery] = useState('');

  const getFilteredList = (filterValue) => {
    if (filterValue) {
      return partyInfo.filter((item) => item[filterValue]);
    }
    return partyInfo;
  };

  const setBillFilter = (queryValue) => {
    setBillFilterQuery(queryValue);
  };

  const setFeedbackFilter = (queryValue) => {
    setFeedbackFilterQuery(queryValue);
  };

  const filteredBillList = getFilteredList(billFilterQuery);
  const filteredFeedBackList = getFilteredList(feedbackFilterQuery);

  const countPercentFeedback = (countFeedback) => {
    const percent = (countFeedback * 100) / eatPizza.length;
    setPercentFeedback(+percent.toFixed(0));
  };

  const fetchData = async () => {
    setIsLoading(true);
    setCollectedMoney(0);

    try {
      const participantsData = await getParticipantsInfo();
      const dietData = await getDietsInfo(participantsData.party.map((person) => person.name));
      const vegansList = dietData.diet
        .filter((person) => person.isVegan)
        .map((person) => person.name);
      const pizzaEaters = participantsData.party.filter((person) => person.eatsPizza);
      const vegansPercent = (vegansList.length / participantsData.party.length) * 100;
      const typeOfPizza = choosePizza(vegansPercent);
      const orderData = await Promise.all([
        getPizzaInfo(typeOfPizza, pizzaEaters.length),
        getColaInfo(participantsData.party.length),
        getCurrencyInfo(),
      ]);
      const orderPrices = calculateTotalOrder(orderData[0], orderData[1], orderData[2]);
      const pricesPerGuest = calculateAmountPerGuest(
        orderPrices.pizzaPrice,
        orderPrices.colaPrice,
        participantsData.party,
        pizzaEaters.length
      );
      const totalPartyInfo = participantsData.party.map((person) => {
        return {
          name: person.name,
          isEatsPizza: person.eatsPizza,
          isPaid: false,
          isFeedback: false,
          isVegan: vegansList.includes(person.name),
          isNotVegan: !vegansList.includes(person.name),
          shareToPay: person.eatsPizza
            ? pricesPerGuest.amountPerGuestPizzaAndCola
            : pricesPerGuest.amountPerGuestCola,
          toPay: person.eatsPizza
            ? pricesPerGuest.amountPerGuestPizzaAndCola
            : pricesPerGuest.amountPerGuestCola,
        };
      });
      setPartyInfo(totalPartyInfo);
      const eatPizza = totalPartyInfo.filter((item) => item.isEatsPizza);
      setEatPizza(eatPizza);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const countPercent = (collectedMoney) => {
    const percentPaid = (collectedMoney / orderAmount) * 100;
    setPercentPaid(+percentPaid.toFixed(0));
  };

  const choosePizza = (vegansPercent) => {
    if (vegansPercent > 51) {
      const randomNumber = Math.floor(Math.random() * 2);
      return randomNumber ? PIZZA_TYPES.CHEESE : PIZZA_TYPES.VEGAN;
    }
    return PIZZA_TYPES.MEAT;
  };

  const calculateExchangedPrice = (currency, price, currencyInfo) =>
    currency === 'BYN' ? price : price * currencyInfo[currency];

  const calculateTotalOrder = (pizzaInfo, colaInfo, currencyInfo) => {
    const pizzaCurrencyType = pizzaInfo?.price?.split(' ').pop();
    const colaCurrencyType = colaInfo?.price?.split(' ').pop();
    const pizzaPrice = +pizzaInfo?.price?.split(' ').shift();
    const colaPrice = +colaInfo?.price?.split(' ').shift();

    const pizzaPriceExchanged = calculateExchangedPrice(
      pizzaCurrencyType,
      pizzaPrice,
      currencyInfo
    );
    const colaPriceExchanged = calculateExchangedPrice(colaCurrencyType, colaPrice, currencyInfo);
    setMoneyToCollect(colaPriceExchanged + pizzaPriceExchanged);
    setOrderAmount(colaPriceExchanged + pizzaPriceExchanged);
    return { pizzaPrice: pizzaPriceExchanged, colaPrice: colaPriceExchanged };
  };

  const calculateAmountPerGuest = (
    pizzaPrice,
    colaPrice,
    participantsInfo,
    eatersOfPizzaNumber
  ) => {
    const amountPerGuestPizza = pizzaPrice / eatersOfPizzaNumber;
    const amountPerGuestCola = colaPrice / participantsInfo.length;
    return {
      amountPerGuestPizzaAndCola: amountPerGuestPizza + amountPerGuestCola,
      amountPerGuestCola: amountPerGuestCola,
    };
  };

  const pay = (participantName) => {
    const copyPartyInfo = JSON.parse(JSON.stringify(partyInfo));
    const indexOfPersonPaid = copyPartyInfo.findIndex((person) => person.name === participantName);
    const updatedMoneySum = collectedMoney + copyPartyInfo[indexOfPersonPaid].shareToPay;
    copyPartyInfo[indexOfPersonPaid].isPaid = true;
    setCollectedMoney(updatedMoneySum);
    setMoneyToCollect(moneyToCollect - copyPartyInfo[indexOfPersonPaid].shareToPay);
    copyPartyInfo[indexOfPersonPaid].shareToPay = 0;
    countPercent(updatedMoneySum);
    setPartyInfo(copyPartyInfo);
  };

  const handleFeedback = (participantName, data) => {
    const copyPartyInfo = JSON.parse(JSON.stringify(partyInfo));
    for (let i = 0; i < copyPartyInfo.length; i++) {
      if (copyPartyInfo[i].name === participantName) {
        copyPartyInfo[i].isFeedback = !copyPartyInfo[i].isFeedback;
        copyPartyInfo[i].feedbackInf = data ? data : {};
        setPartyInfo(copyPartyInfo);
        break;
      }
    }
  };

  const value = {
    isLoading,
    moneyToCollect,
    orderAmount,
    collectedMoney,
    partyInfo,
    choosePizza,
    fetchData,
    pay,
    percentPaid,
    countPercentFeedback,
    percentFeedback,
    handleFeedback,
    filteredBillList,
    filteredFeedBackList,
    setBillFilter,
    setFeedbackFilter,
  };

  return <PartyContext.Provider value={value}>{children}</PartyContext.Provider>;
};
