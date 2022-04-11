const defaultStore = {
  participantsData: [],
  dietsData: [],
  pizzaInfo: {},
  colaInfo: {},
  currencyInfo: {},
};

export default function reducer(state = defaultStore, action) {
  switch (action.type) {
    case 'SET_PARTICIPANTS': {
      return {
        ...state,
        participantsData: action.payload,
      };
    }
    case 'SET_DIETS': {
      return {
        ...state,
        dietsData: action.payload,
      };
    }
    case 'SET_PIZZA_INFO': {
      return {
        ...state,
        pizzaInfo: action.payload,
      };
    }
    case 'SET_COLA_INFO': {
      return {
        ...state,
        colaInfo: action.payload,
      };
    }
    case 'SET_CURRENCY_INFO': {
      return {
        ...state,
        currencyInfo: action.payload,
      };
    }
    default:
      return state;
  }
}
