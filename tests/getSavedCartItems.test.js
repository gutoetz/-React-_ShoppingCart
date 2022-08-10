const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testando se ao chamar a função, localStorage é chamado', () => {
    expect.assertions(1);
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  });
  it('Testando se ao chamar a função, localStorage é chamado com parametro certo', () => {
    expect.assertions(1);
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalledWith('cartItems')
  });
});
