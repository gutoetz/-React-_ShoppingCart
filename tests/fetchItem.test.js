require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testando se fetchItem é uma função', () => {
    expect.assertions(1);
    const actual = typeof fetchItem
    const expected = 'function'
    expect(actual).toEqual(expected)
  });
  it('Testando se fetchItem é chamado ao executar a função',async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalled()
  });
  it('Testando se fetchItem é chamada com o url certo ao executar a função',async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527')
    const expected = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(expected)
  });
  it('Testando se fetchItem com o argumento "MLB1615760527" tem o retorno correto',async () => {
    expect.assertions(1);
    const actual = await fetchItem('MLB1615760527')
    const expected = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(actual).toEqual(item)
  });
  it('Testando se ao não passar argumentos, a função retorna um erro', async () => {
    try {
      expect.assertions(1);
      await fetchItem()
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))  
    }
  });
});
