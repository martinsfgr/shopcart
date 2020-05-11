const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
  let cartProducts = productsList.filter((product) => ids.includes(product.id));

  const productsInfo = cartProducts.map((product) => {
    return {
      "name": product.name,
      "category": product.category
    }
  });

  const cartCategories = cartProducts.reduce((accumulator, product) => {
    return accumulator.add(product.category);
  }, new Set());

  let numberCategories = cartCategories.size;
  let appliedPromotion = promotions[numberCategories - 1];

  const getPromotionalPrice = cartProducts.reduce((accumulator, product) => {
    let hasPromotion = product.promotions.find(promotion => promotion.looks.includes(appliedPromotion));
    const price = hasPromotion ? hasPromotion.price : product.regularPrice;

    return accumulator += price;
  }, 0).toFixed(2);

  const getTotalPrice = cartProducts.reduce((accumulator, product) => {
    const price = product.regularPrice;

    return accumulator += price;
  }, 0).toFixed(2);

  const getDiscountValue = () => (getTotalPrice - getPromotionalPrice).toFixed(2);

  const getDiscountPercentage = () => {
    return ((getTotalPrice - getPromotionalPrice) / getTotalPrice * 100).toFixed(2);
  }

  return {
    "products": productsInfo,
    "promotion": appliedPromotion,
    "totalPrice": getPromotionalPrice,
    "discountValue": getDiscountValue(),
    "discount": `${getDiscountPercentage()}%`
  };
}

module.exports = { getShoppingCart };
