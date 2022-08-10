const saveCartItems = (parametro) => {
  localStorage.setItem('cartItems', parametro);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
