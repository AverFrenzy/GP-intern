const PIZZA_TYPES = {
  CHEESE: 'cheese',
  MEAT: 'meat',
  VEGAN: 'vegan',
};

export const choosePizza = (vegansPercent) => {
  if (vegansPercent > 51) {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber ? PIZZA_TYPES.CHEESE : PIZZA_TYPES.VEGAN;
  }
  return PIZZA_TYPES.MEAT;
};
