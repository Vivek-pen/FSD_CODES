let users = {};
let cart = [];
let products = [
  {id:1, name:'T-Shirt', price:299},
  {id:2, name:'Shoes', price:999}
];

function show(id){
  document.querySelectorAll('section').forEach(s=>s.classList.add('hide'));
  document.getElementById(id).classList.remove('hide');
  if(id==='catalog') loadProducts();
}

function register(){
  let u=newUser.value, p=newPass.value;
  if(u && p){ users[u]=p; alert('Registered! Now login.'); show('login'); }
  else alert('Enter details');
}

function login(){
  let u=user.value, p=pass.value;
  if(users[u]===p){ alert('Welcome '+u); show('catalog'); }
  else alert('Invalid login');
}

function loadProducts(){
  productsDiv = document.getElementById('products');
  productsDiv.innerHTML='';
  products.forEach(p=>{
    productsDiv.innerHTML += `<div class='item'><h3>${p.name}</h3>
      <p>₹${p.price}</p><button onclick='addToCart(${p.id})'>Add</button></div>`;
  });
}

function addToCart(id){
  cart.push(products.find(p=>p.id===id));
  count.textContent=cart.length;
}

function showCart(){
  show('cart');
  let t=0, out='';
  cart.forEach(p=>{
    out+=`<div class='cart-row'><span>${p.name}</span><span>₹${p.price}</span></div>`;
    t+=p.price;
  });
  items.innerHTML=out||'Cart empty';
  total.textContent='Total: ₹'+t;
}
