const gerandoUrl = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = async (id) => {
  const url = gerandoUrl(id);
  const request = await fetch(url);
  const data = await request.json();
  return data;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
