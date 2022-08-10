const cartList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const adicionandoNoCart = async (event) => {
  const identador = event.target.parentNode.firstChild.innerHTML;
  const item = await fetchItem(identador);
  const { id, title, price } = item;
  const newItem = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartList.appendChild(newItem);
  saveCartItems(cartList.innerHTML);
};

const adicionandolisteners = () => {
  const botoes = document.querySelectorAll('.item__add');
  botoes.forEach((butao) => {
    butao.addEventListener('click', adicionandoNoCart);
  });
};

const requisitaProdutos = async () => {
  const produtos = await fetchProducts('computador');
  const documentTemporario = document.createDocumentFragment();
  const capturando = document.querySelector('.items');
  produtos.forEach((product) => {
    const { id, title, thumbnail } = product;
    const item = createProductItemElement({ sku: id, name: title, image: thumbnail });
    documentTemporario.appendChild(item);
  });
  capturando.appendChild(documentTemporario);
  adicionandolisteners();
};

const addingListenersSaved = () => {
  const newLi = document.querySelectorAll('.cart__item');
  newLi.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  requisitaProdutos();
  getSavedCartItems();
  addingListenersSaved();
};
