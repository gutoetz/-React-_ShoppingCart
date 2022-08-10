const createUrl = (item) =>
  `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

const fetchProducts = async (query) => {
    try {
      const url = createUrl(query);
      const response = await fetch(url);
      const { results } = await response.json();
      return results;
    } catch (error) {
      throw new Error('You must provide an url');
    }
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
