const cartList = document.querySelector('.cart__items');
const valorCart = document.querySelector('.total-price');
let ValorTotal = 0;
const botao = document.querySelector('.empty-cart');
const container = document.querySelector('.items');
const classItem = '.cart__item';

const criandoCarregamento = () => {
  const carregando = document.createElement('span');
  carregando.innerHTML = 'carregando...';
  carregando.classList = 'loading';
  container.appendChild(carregando);
};
 const tirandoCarregamento = () => {
  const carregando = document.querySelector('.loading');
  container.removeChild(carregando);
 };
const currency = function (number) {
  return new Intl.NumberFormat('en-IN', 
  { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(number);
};

const somandoValores = (() => {
  ValorTotal = 0;
  const cartItems = document.querySelectorAll(classItem);
  cartItems.forEach((element) => {
    for (let i = 0; i < element.innerHTML.length; i += 1) {
      if (element.innerHTML[i] === '$') {
       const valor = element.innerHTML.slice(i + 1);
       ValorTotal += Number(valor); 
      }
    }
  });
  valorCart.innerHTML = `Valor total: ${currency(ValorTotal)}`; 
});

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

const cartItemClickListener = (event) => {
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
  somandoValores();
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
  somandoValores();
};

const adicionandolisteners = () => {
  const botoes = document.querySelectorAll('.item__add');
  botoes.forEach((butao) => {
    butao.addEventListener('click', adicionandoNoCart);
  });
};

const requisitaProdutos = async () => {
  criandoCarregamento();
  const produtos = await fetchProducts('computador');
  const documentTemporario = document.createDocumentFragment();
  const capturando = document.querySelector('.items');
  tirandoCarregamento();
  produtos.forEach((product) => {
    const { id, title, thumbnail } = product;
    const item = createProductItemElement({ sku: id, name: title, image: thumbnail });
    documentTemporario.appendChild(item);
  });
  capturando.appendChild(documentTemporario);
  adicionandolisteners();
};

const addingListenersSaved = () => {
  const newLi = document.querySelectorAll(classItem);
  newLi.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

const limpandoCarrinho = () => {
  const cartItems = document.querySelectorAll(classItem);
  cartItems.forEach((element) => {
    cartList.removeChild(element);
  });
  somandoValores();
  saveCartItems(cartList.innerHTML);
};

botao.addEventListener('click', limpandoCarrinho);

window.onload = () => {
  requisitaProdutos();
  cartList.innerHTML = getSavedCartItems();
  addingListenersSaved();
  somandoValores();
};
