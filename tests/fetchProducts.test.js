require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testando se a fetchProducts é uma função', () => {
    expect.assertions(1);
    const actual = typeof fetchProducts;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });
  it('Testando se ao passar computador como argumento em fetchProducts, se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  });
  it('Testando se ao passar computador como argumento em fetchProducts, se fetch chama a url certa', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'; 
    expect(fetch).toBeCalledWith(url);
  });
  it('Testando se ao passar computador como argumento em fetchProducts, se o retorno é igual ao esperado', async () => {
    expect.assertions(1);
    const actual = await fetchProducts('computador') 
    expect(actual).toEqual(computadorSearch.results);
  });
  it('Testando se ao não passar argumentos, a função retorna um erro', async () => {
    try {
      await fetchProducts()
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))  
    }
  });
});
