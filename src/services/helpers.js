const PIZZA_TYPES = {
  cheese: 'cheese',
  meat: 'meat',
  vegan: 'vegan',
};

export const choosePizza = (vegansPercent) => {
  if (vegansPercent > 51) {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber ? PIZZA_TYPES.cheese : PIZZA_TYPES.vegan;
  }
  return PIZZA_TYPES.meat;
};
