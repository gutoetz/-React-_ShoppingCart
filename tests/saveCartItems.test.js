const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testando se ao chamar a função, localStorage é chamado', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toBeCalled()
  });
  it('Testando se ao chamar a função com um argumento, ela tem o retorno certo com dois argumentos', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toBeCalledWith('cartItems', '<ol><li>Item</li></ol>')
  });
});
